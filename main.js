import './style.css'

import * as THREE from "three"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});



renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );


const geometry = new THREE.SphereGeometry( 3, 32, 32, 24 )
const texture = new THREE.TextureLoader().load( "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRIzecF3tll7Zv4Ol8jhbrl3a7Ohh8bONrJm0DRNSIeZ_ZbRX-LNlyrpD4WlwsNUg-lNc&usqp=CAU" );
const material = new THREE.MeshStandardMaterial( {color: 0xff6347, map: texture });
const torus = new THREE.Mesh( geometry, material);
torus.scale.set(5, 5, 5);
scene.add(torus)
torus.position.set(0, 0, -20);


//mercury
 const mercuryTexture = new THREE.TextureLoader().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2uMbFMza87PLk1QzUt4dgTeKzro09u82L71UstJy6yZfOXbU0WJfdeRA-zmKZba3JLuE&usqp=CAU")

 const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
 )
 scene.add(mercury)


 //venus

const venusTexture = new THREE.TextureLoader().load("https://lh3.googleusercontent.com/proxy/hVOzCKgA7uNUOzbbEs2wbl6pvghHyRma7pN_FUdCmVO318Cy72rfUWBNukENBeTJ66_bplDHc1cKKjUjc3DvU67M8G6DhlMgZiGSnw");

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
)
scene.add(venus)


//earth
const earthTexture = new THREE.TextureLoader().load("https://supernova.eso.org/static/archives/exhibitionimages/screen/Earth_30k-with-clouds-CC.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
)
scene.add(earth)

//moon
const moonTexture = new THREE.TextureLoader().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMakSbKZ0f2FL3n4pg6gNQuFV7tdPNvBsI09Q_yEFkBDbCTSD42FzYZZg1Q-prW9U0dR4&usqp=CAU");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
)
scene.add(moon)
moon.scale.set(1, 1, 1);

moon.position.z = 85;
moon.position.setX(13);

earth.position.z = 80;
earth.position.x = 10;

mercury.position.z = 40;
mercury.position.x = -1;

venus.position.z = 60;
venus.position.x = 25;



const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);


const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);




const controls = new OrbitControls(camera, renderer.domElement);
//stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 250 ) );

  star.position.set(x, y, z);
  scene.add(star)
}

Array(2000).fill().forEach(addStar)


function moveCamera() {
 const t = document.body.getBoundingClientRect().top;
 moon.rotation.x += 0.05;
 moon.rotation.y += 0.075;
 moon.rotation.z += 0.05;

 earth.rotation.y += 0.01;
 earth.rotation.z += 0.01;

 mercury.rotation.y += 0.01;
 mercury.rotation.z += 0.01;

 venus.rotation.y += 0.01;
 venus.rotation.z += 0.01;

 camera.position.z = t * -0.05;
 camera.position.x = t * -0.009;
 camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera
moveCamera();


function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  moon.rotation.x += 0.005;
  earth.rotation.x += 0.002;
  mercury.rotation.x += 0.002;
  venus.rotation.x += 0.002;
  //controls.update();

  renderer.render(scene, camera);
}

animate();


