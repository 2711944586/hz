# 用 MS Word COM 把 docx 转 PDF
param(
  [string]$src = "D:\文件\项目\会展\第二十三届中国国际装备制造业博览会调研报告.docx",
  [string]$dst = "D:\文件\项目\会展\hz\docs\assets\report.pdf"
)

$ErrorActionPreference = 'Stop'

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
  $doc = $word.Documents.Open($src, $false, $true)  # ReadOnly
  # 17 = wdFormatPDF
  $doc.SaveAs([ref]$dst, [ref]17)
  $doc.Close($false)
  $size = (Get-Item $dst).Length / 1MB
  Write-Host ("PDF saved: {0} ({1:N2} MB)" -f $dst, $size) -ForegroundColor Green
}
finally {
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
  [System.GC]::Collect()
  [System.GC]::WaitForPendingFinalizers()
}
