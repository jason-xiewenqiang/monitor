import { ref, onMounted } from 'vue';

export class Star {
  public x: number;
  public y: number;
  public r: number;
  public speedX: number;
  public speedY: number;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedX = Math.random() * 2 * Math.pow(-1, Math.round(Math.random()));
    this.speedY = Math.random() * 2 * Math.pow(-1, Math.round(Math.random()));
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  move(aw: number, ah: number): void {
    this.x -= this.speedX;
    this.y -= this.speedY;
    // 碰到边界时，反弹，只需要把speed取反就行
    if (this.x < 0 || this.x > aw) this.speedX *= -1;
    if (this.y < 0 || this.y > ah) this.speedY *= -1;
  }
}

export const useCanvas = (id: string): unknown => {
  let canvasDom: HTMLCanvasElement;
  const contentWidth = ref(0);
  const contentHeight = ref(0);
  let stars: Array<Star> = [];
  const rander500 = () => {
    stars = new Array(200).fill(1).map(() => {
      return new Star(
        Math.random() * contentWidth.value,
        Math.random() * contentHeight.value,
        1
      );
    });
    console.log('stars', stars);
  };
  const drawLine = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
  };
  const moveAll = (ctx: CanvasRenderingContext2D) => {
    console.log('asf');
    // 星星的移动
    setInterval(() => {
      ctx.clearRect(0, 0, contentWidth.value, contentHeight.value);
      // 遍历移动渲染
      stars.forEach(star => {
        star.move(contentWidth.value, contentHeight.value);
        star.draw(ctx);
      });
      stars.forEach((star, index) => {
        // 类似于冒泡排序那样，去比较，确保所有星星两两之间都比较到
        for (let i = index + 1; i < stars.length; i++) {
          if (
            Math.abs(star.x - stars[i].x) < 50 &&
            Math.abs(star.y - stars[i].y) < 50
          ) {
            drawLine(star.x, star.y, stars[i].x, stars[i].y, ctx);
          }
        }
      });
    }, 50);
  };

  const goStar = (_ctx: CanvasRenderingContext2D) => {
    rander500();
    moveAll(_ctx);
  };

  onMounted(() => {
    console.log('你要做谁的太阳');
    canvasDom = document.getElementById(id) as HTMLCanvasElement;
    const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    contentWidth.value = canvasDom.getBoundingClientRect().width;
    contentHeight.value = canvasDom.getBoundingClientRect().height;
    goStar(ctx);
  });
  return {
    stars,
  };
};
