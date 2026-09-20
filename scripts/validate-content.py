import sys
from content_lib import ROOT, validate_directory

if __name__ == '__main__':
    records, errors, warnings = validate_directory(sys.argv[1] if len(sys.argv) > 1 else ROOT / 'content')
    for warning in warnings:
        print('WARN:', warning)
    for error in errors:
        print('FAIL:', error)
    print(f'{len(records)} content records; {len(errors)} errors; {len(warnings)} warnings')
    sys.exit(bool(errors))
