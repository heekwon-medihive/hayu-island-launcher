# 하유아일랜드 런처

하유아일랜드 마인크래프트 서버 전용 런처. 실행하면 마인크래프트 1.21.4, Fabric, SOOP 후원 모드를 자동으로 설치하고 서버에 접속한다.
[Helios Launcher](https://github.com/dscalzi/HeliosLauncher)(MIT)를 기반으로 이름·디자인·배포 목록만 바꾼 것이다.

```
스트리머 PC의 런처
  1. distribution/distribution.json 읽기   ◀── 이 저장소 (main 브랜치, raw)
  2. 빠진 파일 내려받기                    ◀── 우리 모드: 이 저장소 distribution/files/
                                          ◀── 마인크래프트·Fabric: 공식 서버
  3. 게임 실행 + 서버 자동 접속
  4. 런처 자체 업데이트                     ◀── 이 저장소 Releases
```

## 스트리머가 하는 일

1. [Releases](https://github.com/heekwon-medihive/hayu-island-launcher/releases/latest)에서 설치 파일(윈도우 `.exe`, 맥 `.dmg`)을 받아 설치
2. 런처에서 마이크로소프트 계정으로 로그인 (정품 확인, 한 번만)
3. 플레이 → 서버 접속 → 게임 채팅에서 `/soop 로그인`

설치 파일에 개발자 서명이 없어 윈도우에서 "알 수 없는 게시자" 경고가 뜬다. "추가 정보 → 실행"으로 진행하면 된다.
맥은 우클릭 → 열기.

## 운영자: 빌드

```bash
npm ci
npm start            # 개발 실행
npm run dist:win     # 윈도우 설치 파일 (윈도우에서)
npm run dist:mac     # 맥 dmg (맥에서)
```

Node 22. 각 OS 설치 파일은 그 OS에서만 만들 수 있으므로 GitHub Actions에 맡긴다:
`v1.0.1` 같은 태그를 푸시하면 세 OS 빌드가 돌고 Releases에 올라간다. 런처의 자동 업데이트도 Releases를 본다.

## 운영자: 모드 업데이트

1. soop-api에서 모드를 빌드해 `distribution/files/`에 jar를 넣는다
2. `distribution/distribution.json`을 다시 생성한다 (Nebula, 절차는 `distribution/README.md`)
3. main에 푸시. 스트리머는 다음에 런처를 켤 때 자동으로 받는다 (raw 캐시 때문에 최대 5분 지연)

## 운영자: 처음 한 번 해야 할 것

- **Azure 앱 등록** — 런처의 마이크로소프트 로그인에 우리 앱 ID가 필요하다. `docs/MicrosoftAuth.md` 절차대로 등록하고 모장 심사를 받은 뒤
  `app/assets/js/ipcconstants.js`의 `AZURE_CLIENT_ID`를 바꾼다. 그 전까지는 Helios 기본값으로 테스트만 한다.
- 로고: `app/assets/images/SealCircle.png`, `LoadingSeal.png`, `LoadingText.png`, `build/icon.png` (지금은 임시 이미지)
- 배경: `app/assets/images/backgrounds/0~7.jpg`

## 구조

- `app/` — 화면(ejs)과 런처 로직. 문구는 `app/assets/lang/` (en_US 기본, ko_KR 한글, `_custom.toml` 우리 문구)
- `distribution/` — 배포 목록과 모드 파일
- `build/` — 앱 아이콘
- `electron-builder.yml` — 설치 파일 빌드·Releases 업로드 설정
- `docs/` — Helios 원본 문서 (배포 목록 형식, 마이크로소프트 인증)
