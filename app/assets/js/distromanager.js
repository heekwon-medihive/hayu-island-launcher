const { DistributionAPI } = require('helios-core/common')

const ConfigManager = require('./configmanager')

// Old WesterosCraft url.
// 배포 목록. 공개 저장소의 main 브랜치에서 그대로 읽는다 (raw.githubusercontent 는 5분쯤 캐시된다)
exports.REMOTE_DISTRO_URL = 'https://raw.githubusercontent.com/heekwon-medihive/hayu-island-launcher/main/distribution/distribution.json'

const api = new DistributionAPI(
    ConfigManager.getLauncherDirectory(),
    null, // Injected forcefully by the preloader.
    null, // Injected forcefully by the preloader.
    exports.REMOTE_DISTRO_URL,
    false
)

exports.DistroAPI = api