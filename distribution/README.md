# distribution/

런처가 켜질 때 읽는 배포 목록과 배포 파일. **전부 이 저장소 main 브랜치에서 raw로 서빙된다.**

| 경로 | 내용 |
|---|---|
| `distribution.json` | 런처가 읽는 목록. 서버 정보, Fabric 로더, 모드(크기·MD5·URL). **손으로 고치지 말고 Nebula로 재생성** |
| `servers/hayu-1.21.4/servermeta.json` | 서버 이름·설명·주소·자동접속 등. 여기를 고친 뒤 재생성 |
| `servers/hayu-1.21.4/fabricmods/required/` | 필수 모드 jar (Fabric API, SOOP 모드) |
| `servers/hayu-1.21.4/hayu-1.21.4.png` | 서버 아이콘 |
| `repo/` | Nebula가 Fabric 메타에서 받아 둔 로더·라이브러리. 건드리지 않는다 |
| `meta/`, `schemas/` | Nebula 메타·스키마 |

마인크래프트 본체는 모장 서버에서 받으므로 여기 없다.

## 재생성 절차 (모드 업데이트·서버 주소 변경 때)

[Nebula](https://github.com/dscalzi/Nebula)를 한 번 받아 둔다:

```bash
git clone https://github.com/dscalzi/Nebula.git && cd Nebula && npm install
cat > .env <<'ENV'
JAVA_EXECUTABLE=/path/to/java          # JDK 17+ 아무거나
ROOT=/path/to/hayu-island-launcher/distribution
BASE_URL=https://raw.githubusercontent.com/heekwon-medihive/hayu-island-launcher/main/distribution/
HELIOS_DATA_FOLDER=/tmp/helios-data
ENV
```

그 다음:

```bash
# 1. 새 모드 jar를 넣는다 (옛 버전 jar는 지운다)
cp soop-api/mod/build/libs/soop-donation-mod-<ver>.jar distribution/servers/hayu-1.21.4/fabricmods/required/

# 2. 필요하면 servermeta.json 의 version 을 올리고 주소·설명을 고친다

# 3. 목록 재생성
cd Nebula && npm run start -- generate distro

# 4. 커밋·푸시. 스트리머는 다음 런처 실행 때 자동으로 받는다 (raw 캐시 최대 5분)
```

마인크래프트나 Fabric 버전을 바꿀 때는 `npm run start -- generate server hayu <mc버전> --fabric <로더버전>`으로
서버 폴더를 새로 만들고, 런처가 설치하는 버전과 GameHostBros 서버 버전이 같은지 확인한다.
