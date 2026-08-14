# ===== C 语言学习 App 本地预览脚本 =====
# 用法:  powershell -ExecutionPolicy Bypass -File serve.ps1
# 启动后在电脑浏览器打开 http://localhost:8000
# 局域网手机访问: http://<电脑IP>:8000  (需同一 Wi-Fi)
param([int]$Port = 8000)

$root = $PSScriptRoot
$job = Start-Job -ScriptBlock {
    param($dir, $port)
    Set-Location $dir
    node -e "
      const http = require('http'), fs = require('fs'), path = require('path');
      const root = process.cwd();
      const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.webmanifest':'application/manifest+json', '.json':'application/json', '.md':'text/plain; charset=utf-8' };
      http.createServer((req, res) => {
        let p = decodeURIComponent(req.url.split('?')[0]);
        if (p === '/') p = '/index.html';
        const fp = path.join(root, p);
        if (!fp.startsWith(root)) { res.writeHead(403); res.end(); return; }
        fs.readFile(fp, (err, data) => {
          if (err) { res.writeHead(404); res.end('404'); return; }
          res.writeHead(200, { 'Content-Type': types[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
          res.end(data);
        });
      }).listen(port, '0.0.0.0', () => console.log('serving on http://0.0.0.0:' + port));
    " $dir $port
} -ArgumentList $root, $Port

Write-Host ""
Write-Host "  C 语言学习 App 已启动:"
Write-Host "    本机:   http://localhost:$Port"
# 显示局域网 IP
$ips = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } |
    Select-Object -ExpandProperty IPAddress
foreach ($ip in $ips) {
    Write-Host "    局域网: http://$ip`:$Port   (手机 Safari 打开这个地址)"
}
Write-Host "  按 Ctrl+C 停止"
Write-Host ""
Receive-Job $job -Wait
