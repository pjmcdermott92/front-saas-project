// Topbar Logic
const topBarBtn = document.querySelector('[data-topbar-toggle]')
const childMenuLinks = document.querySelectorAll('[data-child-expanded]')

topBarBtn.addEventListener('click', () => {
    topBarBtn.classList.toggle('active')
})

childMenuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        link.classList.toggle('expanded')
        showHideTopMenu(link)
    })
})

function showHideTopMenu(link) {
    if (link.getAttribute('data-child-expanded') == 'false') {
        link.setAttribute('data-child-expanded', true)
    } else {
        link.setAttribute('data-child-expanded', false)
    }
}

// Mobile Nav Logic
const mainNavBar = document.querySelector('[data-main-nav]')
const mobileToggleBtn = document.querySelector('[data-mobile-toggle]')

mobileToggleBtn.addEventListener('click', () => {
    mainNavBar.classList.toggle('is-expanded')
})

function makeNavSticky() {
    if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mainNavBar.classList.add('scrolled')
    } else {
        mainNavBar.classList.remove('scrolled')
    }
}

//Logic for setting active Menu Item
const navLinks = document.querySelectorAll('.nav-link > a')
const sections = document.querySelectorAll('*[id]')

/* Hide the Navbar when a link is clicked */
navLinks.forEach(link => {
    link.addEventListener('click', () => mainNavBar.classList.remove('is-expanded'))
})

function setActiveNavLink() {
    let scrollY = window.pageYOffset

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 100

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active')
                if (link.getAttribute('href') === `#${section.id}`) link.classList.add('active')
            })
        }
    })
}

// Show and Hide the Video Modal on click
const playVideoBtn = document.querySelector('#video')
const videoModal = document.querySelector('[data-video-modal-open]')
const pageOverlayElement = document.querySelector('[data-page-overlay]')

playVideoBtn.addEventListener('click', () => {
    videoModal.setAttribute('data-video-modal-open', true)
    pageOverlayElement.style.display = 'block'
})

pageOverlayElement.addEventListener('click', () => {
    stopVideoPlayback()
    videoModal.setAttribute('data-video-modal-open', false)
    pageOverlayElement.style.display = ''
})

function stopVideoPlayback() {
    const videoContentWindow = videoModal.querySelector('[data-video]').contentWindow
    videoContentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
}

// Back to Top Button Logic
const scrollTopBtn = document.querySelector('[data-top-btn]');

scrollTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
})

function showTopButton() {
    if(document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
        scrollTopBtn.classList.add('active')
    } else {
        scrollTopBtn.classList.remove('active')
    }
}

// Keep Benefits Cards Semantic but clickable
const benefitCardElements = document.querySelectorAll('[data-benefit-card]')
benefitCardElements.forEach(card => {
    card.addEventListener('click', e => {
        card.querySelector('a').click()
    })
})

// Client Testimonials Slideshow Logic
const clientTestimonialSlides = document.querySelectorAll('[data-testimonial-slide]')
const testimonialSlideButtons = document.querySelectorAll('[data-testimonial-button]')
let testimonialSlideIndex = 0
let startTestimonialSlides

const TESTIMONIAL_DELAY = 3000

testimonialSlideButtons.forEach(btn => {
    const currentIndex = Array.from(testimonialSlideButtons).indexOf(btn)
    btn.addEventListener('click', () => handleTestimonialChange(currentIndex))
})

function handleTestimonialChange(currentIndex) {
    clientTestimonialSlides.forEach(item => item.classList.remove('active'))
    testimonialSlideButtons.forEach(btn => btn.classList.remove('active'))
    clientTestimonialSlides[currentIndex].classList.add('active')
    testimonialSlideButtons[currentIndex].classList.add('active')
    startTestimonialSlideShow()
}

function cycleTestimonials() {
    testimonialSlideIndex++
    if(testimonialSlideIndex > testimonialSlideButtons.length || testimonialSlideIndex < 0) {
        testimonialSlideIndex = 1
    }
    const newIndex = testimonialSlideIndex - 1
    handleTestimonialChange(newIndex)
}

function startTestimonialSlideShow() {
    clearTimeout(startTestimonialSlides)
    startTestimonialSlides = setTimeout(() => cycleTestimonials(), TESTIMONIAL_DELAY)
}

startTestimonialSlideShow()

// Contact Form Submit Logic
const contactForm = document.querySelector('[data-contact-form]')

contactForm.addEventListener('submit', e => {
    e.preventDefault()
    contactForm.innerHTML = `<h4>Thank you! Your inquiry has been sent!</h4>`
})

// Fade-in Animations
const animatedElements = document.querySelectorAll('[data-hidden]')
let currentWindowHeight

function getViewportHeight() {
    return currentWindowHeight = window.innerHeight    
}

function checkAnimatedElementsPosition() {
    for (let i = 0; i < animatedElements.length; i++) {
        let currentElementPosition = animatedElements[i].getBoundingClientRect().top

        if (currentElementPosition - currentWindowHeight < 0) {
            animatedElements[i].setAttribute('data-hidden', false)
        }
    }
}
getViewportHeight()
checkAnimatedElementsPosition()

// Call Window Scroll & Resize Events
window.onscroll = () => {
    makeNavSticky()
    setActiveNavLink()
    showTopButton()
    checkAnimatedElementsPosition()
}

window.addEventListener('resize', () => {
    setActiveNavLink()
    getViewportHeight()
})