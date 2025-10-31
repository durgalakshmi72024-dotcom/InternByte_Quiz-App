// Confetti Animation
class ConfettiParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.r = Math.random() * 6 + 4;
        this.d = Math.random() * 100 + 10;
        this.color = this.getRandomColor();
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;
        this.particleSpeed = Math.random() * 1 + 0.5;
    }

    getRandomColor() {
        const colors = [
            '#f44336', '#e91e63', '#9c27b0', '#673ab7',
            '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
            '#009688', '#4caf50', '#8bc34a', '#cddc39',
            '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.r / 2;
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(this.x + this.tilt + this.r, this.y);
        this.ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r);
        this.ctx.stroke();
    }

    update() {
        this.tiltAngle += this.tiltAngleIncremental;
        this.y += (Math.cos(this.d) + 1 + this.r / 2) * this.particleSpeed;
        this.tilt = Math.sin(this.tiltAngle) * 15;

        if (this.y > this.canvas.height) {
            this.y = -10;
            this.x = Math.random() * this.canvas.width;
        }
    }
}

class ConfettiEffect {
    constructor() {
        this.canvas = document.getElementById('confetti-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.isActive = false;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start(duration = 5000) {
        if (this.isActive) return;
        
        this.isActive = true;
        this.particles = [];
        
        // Create particles
        for (let i = 0; i < 150; i++) {
            this.particles.push(new ConfettiParticle(this.canvas));
        }

        this.animate();

        // Stop after duration
        setTimeout(() => {
            this.stop();
        }, duration);
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize confetti effect
const confetti = new ConfettiEffect();

