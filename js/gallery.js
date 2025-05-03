let images = [
    { file: 'meme_1.jpg', title: 'Meme 1', description: 'Description for Image 1' },
    { file: 'meme_2.jpg', title: 'Meme 2', description: 'Description for Image 2' },
    { file: 'meme_3.jpg', title: 'Meme 3', description: 'Description for Image 3' },
    { file: 'meme_4.jpg', title: 'Meme 4', description: 'Description for Image 4' },
    { file: 'meme_5.jpg', title: 'Meme 5', description: 'Description for Image 5' },
    { file: 'meme_6.jpg', title: 'Meme 6', description: 'Description for Image 6' }
]

const galleryContainer = document.getElementById('gallery');
const observer = new IntersectionObserver(onIntersection, { rootMargin: '100px' });

images.forEach((imgData, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.dataset.src = `images/memes/${imgData.file}`;
    img.alt = imgData.description;
    img.title = imgData.title;

    item.appendChild(img);
    galleryContainer.appendChild(item);
    observer.observe(img);
});

setupModal();



function onIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;

            fetch(src)
                .then(response => response.blob())
                .then(blob => {
                    img.src = URL.createObjectURL(blob);
                });

            observer.unobserve(img);
        }
    });
}

function setupModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('modal-close');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentIndex = 0;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'modal-info';
    modal.appendChild(infoDiv);

    const showImage = (index) => {
        if (index >= 0 && index < galleryItems.length) {
            currentIndex = index;
            const img = galleryItems[currentIndex];
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            infoDiv.textContent = img.alt || '';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    document.getElementById('gallery').addEventListener('click', (e) => {
        const imgElement = e.target.closest('.gallery-item img');
        if (imgElement) {
            currentIndex = galleryItems.indexOf(imgElement);
            showImage(currentIndex);
        }
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => e.target !== modalImg && e.target !== closeBtn && closeModal());

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        }
    });
}