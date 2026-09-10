document.addEventListener('DOMContentLoaded', function () {
    async function cardHistory() {
        const historyContainer = document.getElementById('history-container');
        if (!historyContainer) return;
   
        const data = await fetchHistoryData();
        const html = data.map(item => `
            <div class="swiper-slide history_slide">
                <span class="history_slide_time">A.D.${item.year}</span>
                <span class="history_slide_link">${item.title}</span>
            </div>
        `).join('');
   
        const swiperContainer = document.querySelector('.history_swiper-container');
        document.getElementById('history_container_wrapper').innerHTML = html;
   
        const swiperHistory = new Swiper(swiperContainer, {
            loop: true,
            direction: 'vertical',
            autoplay: {disableOnInteraction: true, delay: 5000},
            mousewheel: false,
        });
   
        historyContainer.onmouseenter = () => swiperHistory.autoplay.stop();
        historyContainer.onmouseleave = () => swiperHistory.autoplay.start();
    }
   
    cardHistory();
    document.addEventListener('pjax:complete', cardHistory);
   
    async function fetchHistoryData() {
        const myDate = new Date();
        const month = `${myDate.getMonth() + 1}`.padStart(2, '0');
        const day = `${myDate.getDate()}`.padStart(2, '0');
        const formattedDate = `${month}${day}`;
        const historyDataUrl = `https://api.nsmao.net/api/history/query?key=7s6oqQUBTNq57QBqeGWcr6Ff5s`; //申请：https://api.nsmao.net
   
        try {
            const response = await fetch(historyDataUrl);
            const result = await response.json();
   
            if (result.code === 200) {
                const data = result.data;
                const formattedData = Object.entries(data).map(([year, event]) => ({
                    year: year.replace(/年$/, ''),
                    title: event
                }));
                return formattedData;
            } else {
                console.error('Error fetching history data:', result.msg);
                return [];
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }
   
    cardHistory()
    document.addEventListener('pjax:complete', cardHistory);
   })