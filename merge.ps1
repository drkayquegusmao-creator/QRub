$all = @()
for ($i=1; $i -le 10; $i++) {
    $path = "c:\Users\kayqu\Desktop\Qrub1\QRub\derrame_pleural_batch$i.json"
    $json = Get-Content $path -Raw | ConvertFrom-Json
    $all += $json
}
$all | ConvertTo-Json -Depth 10 | Set-Content "c:\Users\kayqu\Desktop\Qrub1\QRub\derrame_pleural_total.json" -Encoding UTF8
Write-Host "Merged $($all.Count) questions"
