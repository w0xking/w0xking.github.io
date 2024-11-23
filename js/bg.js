// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    
    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
    
    <h2 id="随机背景"><a href="#随机背景" class="headerlink" title="随机背景"></a>随机背景</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bing.img.run/1920x1080.php)" class="imgbox" onclick="changeBg('url(https\://bing.img.run/1920x1080.php)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bing.img.run/rand.php)" class="imgbox" onclick="changeBg('url(https\://bing.img.run/rand.php)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://api.r10086.com/樱道随机图片api接口.php?图片系列=风景系列1)" class="imgbox" onclick="changeBg('url(https\://api.r10086.com/樱道随机图片api接口.php?图片系列=风景系列1)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.seovx.com/d/?mom=302)" class="imgbox" onclick="changeBg('url(https\://cdn.seovx.com/d/?mom=302)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/1920/1080.webp)" class="imgbox" onclick="changeBg('url(https\://picsum.photos/1920/1080.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.seovx.com/ha/?mom=302)" class="imgbox" onclick="changeBg('url(https\://cdn.seovx.com/ha/?mom=302)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.seovx.com/?mom=302)" class="imgbox" onclick="changeBg('url(https\://cdn.seovx.com/?mom=302)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://api.btstu.cn/sjbz/api.php?lx=girl&format=images)" class="imgbox" onclick="changeBg('url(https\://api.btstu.cn/sjbz/api.php?lx=girl&format=images)')"></a>
    </div>
    
    
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #ee9ca7, #ffdde1)" onclick="changeBg('linear-gradient(to right, #ee9ca7, #ffdde1)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)" onclick="changeBg('linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #dd3e54, #6be585)" onclick="changeBg('linear-gradient(to right, #dd3e54, #6be585)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #74ebd5, #acb6e5)" onclick="changeBg('linear-gradient(to right, #74ebd5, #acb6e5)')"></a>
    </div>
    
    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ff69b4" onclick="changeBg('#ff69b4')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #69ffd1" onclick="changeBg('#69ffd1')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ffb6ba" onclick="changeBg('#ffb6ba')"></a> 
    </div>
`;
}

// 适应窗口大小
function winResize() {
    let box = document.querySelector('#changeBgBox')
    if (!box || box.classList.contains('min') || box.classList.contains('max')) return // 2023-02-10更新
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}
function whenDOMReady() {
    // 背景localstorage
    try {
        let data = loadData('blogbg', 1440)
        if (data) changeBg(data, 1)
        else localStorage.removeItem('blogbg');
    } catch (error) { localStorage.removeItem('blogbg'); }
}
whenDOMReady()
document.addEventListener("pjax:success", whenDOMReady)

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}