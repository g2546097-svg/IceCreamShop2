// ===================================
// ① 画像を保存する変数
// ===================================

let backgroundImage;
let coneImage;
let iceCreamImages = [];

let fileNames = [
  "images/01_vanilla.png",
  "images/02_chocolate.png",
  "images/03_strawberry.png",
  "images/04_matcha.png",
  "images/05_cookies_and_cream.png",
  "images/06_chocolate_mint.png",
  "images/07_pistachio.png",
  "images/08_salted_caramel.png",
  "images/09_rum_raisin.png",
  "images/10_coconut.png",
  "images/11_lemon_sorbet.png",
  "images/12_mango.png",
  "images/13_blueberry.png",
  "images/14_coffee.png",
  "images/15_peach.png",
  "images/16_pumpkin.png",
  "images/17_kinako.png",
  "images/18_earl_grey.png",
  "images/19_orange.png",
  "images/20_black_sesame.png"
];

// ===================================
// ② アイスクリームの状態を管理する変数
// ===================================

// コーンに積み重なったアイスクリーム
let stackedIceCreams = [];

// 現在落下中のアイスクリーム
let fallingIceCream = null;

// アイスクリームの大きさ
let scoopSize = 150;

// 落下速度
let gravity = 0.8;

// 画像読み込みが完了したかどうか
let assetsReady = false;

// アイスクリームの最大数
let maxIceCreams = 4;

// ===================================
// ③ 初期設定
// ===================================

async function setup() {

  canvas = createCanvas(920, 600);
  canvas.parent("p5");

  imageMode(CENTER);

  //背景画像の読み込み
  backgroundImage=await loadImage("images/background.png");

  // コーン画像を読み込む
  coneImage = await loadImage("images/cone.png");

// 20種類のアイス画像を読み込む
iceCreamImages = await Promise.all(
  fileNames.map(name => loadImage(name))
);

  // 画像の読み込み完了
  assetsReady = true;
}


// ===================================
// ④ 画面描画
// ===================================

function draw() {

  image(backgroundImage,width/2,height/2,width,height);

  // 画像の読み込み中
  if (!assetsReady) {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(0);
    text("Loading...", width / 2, height / 2);
    return;
  }

  // コーンを表示
  image(coneImage, width / 2, 460, 150, 300);

  // 積み重なったアイスを表示
  for (let i = 0; i < stackedIceCreams.length; i++) {

    image(
      stackedIceCreams[i].img,
      stackedIceCreams[i].x,
      stackedIceCreams[i].y,
      scoopSize,
      scoopSize
    );

  }

  // 落下中のアイスを表示
  if (fallingIceCream !== null) {

    // 重力によって速度を増やす
    fallingIceCream.vy += gravity;

    // 速度に応じて落下させる
    fallingIceCream.y += fallingIceCream.vy;

    // アイスを表示
    image(
      fallingIceCream.img,
      fallingIceCream.x,
      fallingIceCream.y,
      scoopSize,
      scoopSize
    );

    // 目標位置に到達したら積み重ねる
    if (fallingIceCream.y >= fallingIceCream.targetY) {

      fallingIceCream.y = fallingIceCream.targetY;

      stackedIceCreams.push({
        img: fallingIceCream.img,
        x: fallingIceCream.x,
        y: fallingIceCream.y
      });

      fallingIceCream = null;

    }

  }

}


// ===================================
// ⑤ 画面をクリックしたときの処理
// ===================================

function mousePressed() {

    // 画像の読み込みが終わっていなければ何もしない
  if (!assetsReady) return;

    //画面の下部をクリックしたらリセット
  if (mouseY>height-100){

 //積み重なったアイスをすべて消す
    stackedIceCreams=[];

 //落下中のアイスも消す
    fallingIceCream=null;

    return;
  }

// アイスが4個積み重なっていたら何もしない
  if (stackedIceCreams.length >= maxIceCreams) {
    return;
  }

  
  // すでにアイスが落下中なら何もしない
  if (fallingIceCream !== null) return;

  // 20種類からランダムに選ぶ
  let randomIndex = floor(random(iceCreamImages.length));

  // アイスの着地点を計算
  let targetY = 370 - stackedIceCreams.length * 80;

  // 新しいアイスを落下させる
  fallingIceCream = {
    img: iceCreamImages[randomIndex],
    x: width / 2,
    y: -scoopSize,
    vy: 0,
    targetY: targetY
  };

}
