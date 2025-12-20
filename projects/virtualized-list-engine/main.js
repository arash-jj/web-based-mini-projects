// Dummy data
    const items = Array.from({ length: 10000 }, (_, i) => `Item #${i}`);
// Configurations
    const ITEM_HEIGHT = 40;
    const VIEWPORT_HEIGHT = 300;
    const VISIBLE_COUNT = Math.ceil(VIEWPORT_HEIGHT / ITEM_HEIGHT);
    const OVERSCAN = 5;
    const RENDER_COUNT = VISIBLE_COUNT + OVERSCAN;
// Elements
    const viewport = document.querySelector('.viewport');
    const spacer = document.querySelector('.spacer');
    const list = document.querySelector('.list');

spacer.style.height = `${items.length * ITEM_HEIGHT}px`;

function render() {
    const scrollTop = viewport.scrollTop;
    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
    const endIndex = Math.min(items.length, startIndex + RENDER_COUNT);

    list.style.transform = `translateY(${startIndex * ITEM_HEIGHT}px)`;
    list.innerHTML = '';
    for (let i = startIndex; i < endIndex; i++) {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = items[i];
        list.appendChild(div);
    }
}
viewport.addEventListener('scroll', render);
render();
