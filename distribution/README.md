# distribution/

런처가 켜질 때 읽는 배포 목록과 우리 모드 파일이 들어가는 곳.

- `distribution.json` — 서버 정보(이름·주소·마인크래프트 버전), Fabric 로더 버전, 모드 목록(크기·MD5·URL). Nebula로 생성한다
- `files/` — 우리 모드 jar 등 배포 파일. `distribution.json`의 URL이 이 폴더의 raw.githubusercontent 주소를 가리킨다

마인크래프트 본체와 Fabric 로더·API는 각각 공식 서버에서 받으므로 여기 두지 않는다.
갱신 절차는 저장소 루트 README 참고.
