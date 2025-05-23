let facemesh;
let video;
let predictions = [];
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];

function setup() {
  // 置中畫布
  let cnv = createCanvas(640, 480);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', gotResults);
}

function modelReady() {
  // 模型載入完成
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;

    // 第一組紅色線
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      let idx = indices[i];
      let [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 第二組藍色線
    const indices2 = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];
    stroke(0, 0, 255); // 藍色
    strokeWeight(15);
    noFill();
    for (let i = 0; i < indices2.length - 1; i++) {
      let idxA = indices2[i];
      let idxB = indices2[i + 1];
      let [xA, yA] = keypoints[idxA];
      let [xB, yB] = keypoints[idxB];
      line(xA, yA, xB, yB);
    }
  }
}
