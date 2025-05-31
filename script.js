// Empria Website - Interactive JavaScript
// Advanced animations and smooth user experience

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initializeNavigation()
  initializeAnimations()
  initializeScrollEffects()
  initializeInteractiveElements()
  initializeProductButtons()
  initializeParallax()
  initializeTechNodes()
  initializeCounters()
  initializeLoadingScreen()
})

// Navigation Functionality
function initializeNavigation() {
  const navToggle = document.querySelector('.nav-toggle')
  const navMenu = document.querySelector('.nav-menu')
  const navLinks = document.querySelectorAll('.nav-link')
  const navbar = document.querySelector('.navbar')

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active')
      navToggle.classList.toggle('active')

      // Animate hamburger bars
      const bars = navToggle.querySelectorAll('.bar')
      bars.forEach((bar, index) => {
        bar.style.transition = 'all 0.3s ease'
        if (navToggle.classList.contains('active')) {
          if (index === 0)
            bar.style.transform = 'rotate(45deg) translate(6px, 6px)'
          if (index === 1) bar.style.opacity = '0'
          if (index === 2)
            bar.style.transform = 'rotate(-45deg) translate(6px, -6px)'
        } else {
          bar.style.transform = 'none'
          bar.style.opacity = '1'
        }
      })
    })
  }

  // Close mobile menu when clicking links
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active')
      navToggle.classList.remove('active')

      // Reset hamburger bars
      const bars = navToggle.querySelectorAll('.bar')
      bars.forEach((bar) => {
        bar.style.transform = 'none'
        bar.style.opacity = '1'
      })
    })
  })

  // Navbar scroll effect
  let lastScrollTop = 0
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      navbar.style.background = 'rgba(15, 15, 15, 0.95)'
      navbar.style.backdropFilter = 'blur(20px)'
    } else {
      navbar.style.background = 'rgba(15, 15, 15, 0.9)'
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)'
    } else {
      navbar.style.transform = 'translateY(0)'
    }
    lastScrollTop = scrollTop
  })

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href')
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      }
    })
  })
}

// Intersection Observer for Animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'

        // Add stagger animation for children
        const children = entry.target.querySelectorAll(
          '.product-card, .stat-item, .tech-feature'
        )
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = '1'
            child.style.transform = 'translateY(0)'
          }, index * 100)
        })
      }
    })
  }, observerOptions)

  // Observe sections
  const sections = document.querySelectorAll(
    '.products, .stats, .technology, .cta'
  )
  sections.forEach((section) => {
    section.style.opacity = '0'
    section.style.transform = 'translateY(30px)'
    section.style.transition = 'all 0.6s ease'
    observer.observe(section)
  })

  // Observe individual elements
  const animatedElements = document.querySelectorAll(
    '.product-card, .stat-item, .tech-feature'
  )
  animatedElements.forEach((element) => {
    element.style.opacity = '0'
    element.style.transform = 'translateY(30px)'
    element.style.transition = 'all 0.6s ease'
  })
}

// Scroll Effects
function initializeScrollEffects() {
  // Create scroll progress indicator
  const scrollIndicator = document.createElement('div')
  scrollIndicator.className = 'scroll-indicator'
  document.body.appendChild(scrollIndicator)

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const scrollProgress = (scrollTop / scrollHeight) * 100
    scrollIndicator.style.width = scrollProgress + '%'
  })

  // Parallax effect for hero background elements
  const heroElements = document.querySelectorAll('.bg-circle, .bg-grid')
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    heroElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`
    })
  })
}

// Interactive Elements
function initializeInteractiveElements() {
  // Floating cards interaction
  const floatingCards = document.querySelectorAll('.floating-card')
  floatingCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-20px) scale(1.05)'
      card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)'
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-10px) scale(1)'
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)'
    })
  })

  // Product cards 3D tilt effect
  const productCards = document.querySelectorAll('.product-card')
  productCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    })
  })

  // Button hover effects
  const buttons = document.querySelectorAll('.btn')
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)'
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)'
    })
  })
}

// Product Button Functionality
function initializeProductButtons() {
  const productButtons = document.querySelectorAll('.btn-product')

  productButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Add loading animation
      const originalText = button.innerHTML
      button.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Redirecionando...'
      button.disabled = true

      // Simulate loading and redirect
      setTimeout(() => {
        const urls = [
          'https://linkize.com.br',
          'https://wampla.com.br',
          'https://plannai.com.br',
        ]

        window.open(urls[index], '_blank')

        // Reset button
        button.innerHTML = originalText
        button.disabled = false
      }, 1500)
    })
  })

  // Hero buttons functionality
  const heroButtons = document.querySelectorAll('.hero-buttons .btn')
  heroButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.textContent.includes('Conheça')) {
        e.preventDefault()
        document.querySelector('#products').scrollIntoView({
          behavior: 'smooth',
        })
      } else if (button.textContent.includes('Demo')) {
        // Demo functionality
        showDemoModal()
      }
    })
  })
}

// Demo Modal
function showDemoModal() {
  const modal = document.createElement('div')
  modal.className = 'demo-modal'
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎥 Demo da Empria</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Assista nosso demo exclusivo e descubra como nossas soluções de IA podem transformar seu negócio.</p>
                <div class="demo-video">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Demo Interativo</p>
                    </div>
                </div>
                <div class="modal-buttons">
                    <button class="btn btn-primary">Assistir Demo</button>
                    <button class="btn btn-outline">Agendar Demonstração</button>
                </div>
            </div>
        </div>
    `

  // Add modal styles
  const style = document.createElement('style')
  style.textContent = `
        .demo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: var(--surface-dark);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-lg);
            padding: 40px;
            max-width: 600px;
            width: 90%;
            animation: scaleIn 0.3s ease;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        .modal-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 24px;
            cursor: pointer;
        }
        .video-placeholder {
            background: var(--gradient-surface);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 60px;
            text-align: center;
            margin: 24px 0;
        }
        .video-placeholder i {
            font-size: 48px;
            color: var(--primary-color);
            margin-bottom: 16px;
        }
        .modal-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `
  document.head.appendChild(style)
  document.body.appendChild(modal)

  // Close modal functionality
  const closeModal = () => {
    modal.style.animation = 'fadeOut 0.3s ease'
    setTimeout(() => {
      document.body.removeChild(modal)
      document.head.removeChild(style)
    }, 300)
  }

  modal.querySelector('.modal-close').addEventListener('click', closeModal)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
}

// Parallax Effects
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('.hero-bg-elements')

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset

    parallaxElements.forEach((element) => {
      const speed = 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Tech Nodes Interactive Animation
function initializeTechNodes() {
  const techNodes = document.querySelectorAll('.tech-node')
  const connections = document.querySelectorAll('.connection-line')

  techNodes.forEach((node, index) => {
    node.addEventListener('mouseenter', () => {
      // Activate current node
      node.classList.add('active')

      // Animate connections
      connections.forEach((line) => {
        line.style.strokeDasharray = '5,5'
        line.style.animation = 'dash 0.5s linear infinite'
        line.style.opacity = '0.8'
      })

      // Add glow effect
      node.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.5)'
    })

    node.addEventListener('mouseleave', () => {
      node.classList.remove('active')
      node.style.boxShadow = 'none'

      connections.forEach((line) => {
        line.style.opacity = '0.3'
      })
    })
  })

  // Auto-rotate active node
  let currentActiveNode = 0
  setInterval(() => {
    techNodes.forEach((node) => node.classList.remove('active'))
    techNodes[currentActiveNode].classList.add('active')
    currentActiveNode = (currentActiveNode + 1) % techNodes.length
  }, 3000)
}

// Animated Counters
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number')
  const speed = 200

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = counter.textContent
          const numericTarget = parseFloat(target.replace(/[^\d.]/g, ''))
          const suffix = target.replace(/[\d.]/g, '')

          let count = 0
          const increment = numericTarget / speed

          const updateCounter = () => {
            if (count < numericTarget) {
              count += increment

              if (suffix.includes('K')) {
                counter.textContent = Math.floor(count) + 'K+'
              } else if (suffix.includes('B')) {
                counter.textContent = 'R$ ' + count.toFixed(1) + 'B'
              } else if (suffix.includes('%')) {
                counter.textContent = count.toFixed(1) + '%'
              } else {
                counter.textContent = Math.floor(count) + suffix
              }

              requestAnimationFrame(updateCounter)
            } else {
              counter.textContent = target
            }
          }

          updateCounter()
          observer.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 }
  )

  counters.forEach((counter) => observer.observe(counter))
}

// Loading Screen
function initializeLoadingScreen() {
  const loadingScreen = document.createElement('div')
  loadingScreen.className = 'loading'
  loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <span class="logo-text">Empria</span>
                <div class="logo-dot"></div>
            </div>
            <div class="loading-spinner"></div>
            <p>Carregando experiência premium...</p>
        </div>
    `

  const style = document.createElement('style')
  style.textContent = `
        .loading-content {
            text-align: center;
            color: var(--text-primary);
        }
        .loading-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-bottom: 40px;
            font-size: 2rem;
            font-weight: 800;
        }
        .loading-logo .logo-text {
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .loading-content p {
            margin-top: 20px;
            color: var(--text-secondary);
        }
    `
  document.head.appendChild(style)
  document.body.appendChild(loadingScreen)

  // Remove loading screen after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(loadingScreen)
        document.head.removeChild(style)
      }, 500)
    }, 1000)
  })
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance Optimization
function optimizeAnimations() {
  // Reduce animations on low-end devices
  if (navigator.hardwareConcurrency <= 2) {
    document.body.classList.add('reduced-motion')
  }

  // Pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    const animations = document.querySelectorAll('*')
    animations.forEach((element) => {
      if (document.hidden) {
        element.style.animationPlayState = 'paused'
      } else {
        element.style.animationPlayState = 'running'
      }
    })
  })
}

// Initialize performance optimizations
optimizeAnimations()

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals
    const modals = document.querySelectorAll('.demo-modal')
    modals.forEach((modal) => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal)
      }
    })
  }
})

// Touch Gestures for Mobile
let touchStartY = 0
let touchEndY = 0

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY
})

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY
  handleSwipe()
})

function handleSwipe() {
  if (touchEndY < touchStartY - 50) {
    // Swipe up - scroll to next section
    const currentSection = getCurrentSection()
    const nextSection = getNextSection(currentSection)
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (touchEndY > touchStartY + 50) {
    // Swipe down - scroll to previous section
    const currentSection = getCurrentSection()
    const prevSection = getPreviousSection(currentSection)
    if (prevSection) {
      prevSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

function getCurrentSection() {
  const sections = document.querySelectorAll('section')
  const scrollPos = window.pageYOffset + 200

  for (let section of sections) {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      return section
    }
  }
  return sections[0]
}

function getNextSection(currentSection) {
  const sections = Array.from(document.querySelectorAll('section'))
  const currentIndex = sections.indexOf(currentSection)
  return sections[currentIndex + 1] || null
}

function getPreviousSection(currentSection) {
  const sections = Array.from(document.querySelectorAll('section'))
  const currentIndex = sections.indexOf(currentSection)
  return sections[currentIndex - 1] || null
}

// Add smooth reveal animations for images
function initializeImageAnimations() {
  const images = document.querySelectorAll('img')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'scale(1)'
      }
    })
  })

  images.forEach((img) => {
    img.style.opacity = '0'
    img.style.transform = 'scale(0.8)'
    img.style.transition = 'all 0.6s ease'
    imageObserver.observe(img)
  })
}

// Initialize image animations
initializeImageAnimations()

console.log('🚀 Empria Website - Carregado com sucesso!')
