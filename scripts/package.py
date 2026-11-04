"""Package only the explicit public static-site files; never publish anything."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
files = [root / name for name in ('index.html', 'styles.css', 'script.js', '.nojekyll')]
files += [root / 'assets' / name for name in ('front-cover.png', 'river.svg', 'favicon.svg')]
for file in files:
    if not file.is_file() or file.is_symlink():
        raise SystemExit(f'Missing or unexpected site file: {file.name}')
output = root.parent / 'deliverables' / 'mybook-website.zip'
output.parent.mkdir(exist_ok=True)
with ZipFile(output, 'w', compression=ZIP_DEFLATED) as archive:
    for file in files:
        archive.write(file, file.relative_to(root))
with ZipFile(output) as archive:
    assert archive.testzip() is None
    assert len(archive.namelist()) == 7
print(f'Created and verified {output} ({output.stat().st_size:,} bytes)')
