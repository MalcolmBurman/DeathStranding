import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'; 
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';

//init
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0xbcced1);
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
const gloader = new GLTFLoader();

//Camera
const fov = 60;
const aspect = w / h;
const near = 0.001;
const far = 200;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-50.17980927132954, 2.0983951802410687, 36.11885028925514);
camera.lookAt(0,0,0);
const scene = new THREE.Scene();

/*
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
*/
//controls.enabled = false; 


//objects
const neonText = document.getElementById('title');
const loadingScreen = document.getElementById('loadingScreen');
const startButtonElement = document.getElementById("startButton");
const infoBox = document.getElementById('infobox');
const gui = document.getElementById('gui');
const musicButton = document.getElementById('musicButton');


let mountain; 
gloader.load('../DeathStranding/objekt/mountain/scene.gltf', function (e) {
    mountain = e.scene;

    mountain.traverse((node) => {
        if (node.isMesh) {
            // Convert material if needed
            if (!(node.material instanceof THREE.MeshStandardMaterial)) {
                node.material = new THREE.MeshStandardMaterial({
                    color: node.material.color,
                    map: node.material.map,
                    normalMap: node.material.normalMap,
                    roughness: 0.5, // Adjust as needed
                    metalness: 0.5, // Adjust as needed
                });
            }
            node.material.needsUpdate = true; // Ensure material updates
        }
    });

    mountain.scale.set(100, 100, 100);

    scene.add(mountain);
    
});

let DSbox;
let DSbox2;
let DSbox3;
gloader.load('../DeathStranding/objekt/DSbox/scene.gltf', function (e){
    DSbox = e.scene;
    DSbox.position.set(-42.07233273805982, -3.9, 22.59873784177457);
    DSbox.scale.set(0.01, 0.01, 0.01);
    scene.add(DSbox);

    
    DSbox2 = DSbox.clone();
    DSbox2.position.set(-42.07233273805982, -3.832, 22.59873784177457);
    //DSbox2.rotation.x = 2;
    DSbox2.scale.set(0.01, 0.01, 0.01);
    scene.add(DSbox2);

    DSbox3 = DSbox.clone();
    DSbox3.position.set(-42.07233273805982, -3.86, 22.73);
    DSbox3.rotation.x = 1;
    DSbox3.scale.set(0.01, 0.01, 0.01);
    scene.add(DSbox3);
});

let BTlion;
gloader.load('../DeathStranding/objekt/BTlion/BTlion.gltf', function (e) {
    BTlion = e.scene;
    BTlion.traverse((node) => {
        if (node.isMesh) {
            const blackMaterial = new THREE.MeshStandardMaterial({
                color: 0x444444, 
                roughness: 0.2,  
                metalness: 0.5,    
                side: THREE.DoubleSide 
            });

            // Assign the new material to the mesh
            node.material = blackMaterial;
        }
    });

    BTlion.rotation.x = 11.2;
    BTlion.position.set(29.820704171802966, -5.5, -16.425639448041746);
    BTlion.scale.set(0.05, 0.05, 0.05);
    scene.add(BTlion);
});

let chiralCrystal
gloader.load('../DeathStranding/objekt/chiralCrystal/result.gltf', function (e) {
    chiralCrystal = e.scene;
    chiralCrystal.traverse((node) => {
        if (node.isMesh) {
            
            const goldMaterial = new THREE.MeshStandardMaterial({
                color: 0xB8860B, 
                roughness: 0.2,  
                metalness: 0.7,    
                //side: THREE.DoubleSide
            });

            node.material = goldMaterial;
        }
    });

    chiralCrystal.rotation.y = 110  * (Math.PI / 180);
    chiralCrystal.position.set(-27.6, -4.4, 1.3);
    chiralCrystal.scale.set(0.003, 0.003, 0.003);
    scene.add(chiralCrystal);
});



/* axis helpers
const axesHelper = new THREE.AxesHelper(100); // The size of the axes helper lines
scene.add(axesHelper);

const axesHelper2 = new THREE.AxesHelper(100);
axesHelper2.rotation.y = Math.PI / 1; // Rotate 45 degrees around the Y-axis
scene.add(axesHelper2);
*/


//lights
const lightSource2 = new THREE.AmbientLight( 0xbcced1, 0.5);
const lightSource = new THREE.SpotLight( 0xbcced1, 2.4, 100);
const lightSource3 = new THREE.SpotLight( 0xbcced1, 2.4, 60);
lightSource.position.set(3, 50, 0);
lightSource3.position.set(-42.07233273805982, 50, 22.59873784177457);


scene.add(lightSource2);

scene.add(lightSource);
//scene.add(lightSource3);
//scene.fog = new THREE.Fog(0xbcced1, 1, 99);
scene.fog = new THREE.FogExp2( 0xbcced1, 0.02 );


//Spline and path stuff
const pathPoints = [
new THREE.Vector3(-50.17980927132954, 2.0983951802410687, 36.11885028925514),
new THREE.Vector3(-44.16364306634191, -3.464510253970469, 24.009825928355134),   
new THREE.Vector3(-39.50652428943637, -0.4016048197589319, 18.911775272889866),   
new THREE.Vector3(-29.71798319105134, -5.501604819758926, 6.580182452478313),   
new THREE.Vector3(-27.18218084794269, -1.5655128359254742, -0.3900666836123588),   
new THREE.Vector3(-15.075640504762744, -3.865512835925479, -6.100316332265821),   
new THREE.Vector3(-5.146019878835263, -1.2016048197589326, -3.336452693819579),   
new THREE.Vector3(8.54573901043434, -5.401604819758929, -3.2281528705256153),   
new THREE.Vector3(25.718718749563468, 1.0983951802410772, -11.113358863204386),   
new THREE.Vector3(30.85994854806327, -4.201604819758915, -17.5556128790294),   
new THREE.Vector3(35.65440301246559, -1.801604819758878, 2.6131278902012802),   
];

const spline = new THREE.CatmullRomCurve3(pathPoints);

const splinePoints = spline.getPoints(100); // 100 points for a smooth curve
const geometry = new THREE.BufferGeometry().setFromPoints(splinePoints);

const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Green color

const splineLine = new THREE.Line(geometry, material);

//scene.add(splineLine);


////Buttons
let cami = 0;
let camPosIndex = 0;
let t = 0; 
let targetIndex = camPosIndex;
let l = false; 

function smoothTransitionToNextPoint() {
    if (camPosIndex < pathPoints.length - 1) {
        cami++;
        console.log(camPosIndex);
        targetIndex = camPosIndex + 1;
        t = 0; 
    }
    
    
}

function smoothTransitionToPrevPoint() {
    if (camPosIndex > 0) {
        cami--;
        console.log(camPosIndex);
        targetIndex = camPosIndex - 1; 
        t = 0;
    }
    
}

function startButton(){
    if(!l){
        neonText.style="color: #eeeeee;"
        neonText.classList.remove('fade-out-color');
        l = true
    }
    startButtonElement.style="pointer-events: none";
    cami++
    targetIndex = camPosIndex + 1; 
    t = 0;
}


function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function easeOutQuad(t) {
    return t * (2 - t);
}

function smoothLookAt(target, y = true, t = 0.05) {
    // Step 1: Calculate the direction vector from the camera to the target
    const direction = new THREE.Vector3();
    direction.subVectors(target, camera.position).normalize();

    if(y){
    // Step 2: Project the direction vector onto the XZ plane to ignore the Y-axis rotation
    direction.y = 0; // Set the Y component to 0 to ignore rotation around the Y-axis
    direction.normalize(); // Re-normalize the direction vector
    }

    // Step 3: Create a quaternion from the direction vector
    const quat = new THREE.Quaternion();
    const lookAtDirection = new THREE.Vector3(0, 0, -1); // The default forward direction for the camera
    quat.setFromUnitVectors(lookAtDirection, direction);

    // Step 4: Smoothly interpolate the camera's quaternion to the new quaternion
    const cameraQuat = new THREE.Quaternion();
    camera.quaternion.slerp(quat, t); // 0.1 is the interpolation factor

    // Step 5: Set the camera's Y rotation to its original value to maintain its orientation
    const euler = new THREE.Euler();
    euler.setFromQuaternion(camera.quaternion);
    euler.y = camera.rotation.y; // Keep the original Y rotation

    camera.quaternion.setFromEuler(euler); // Update the quaternion with the new Euler angles
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e){
    mouseX = (e.clientX - window.innerWidth) / 100;
    mouseY = (e.clientY - window.innerHeight) / 100;
});

let easeinout = 0;
let easeout = 0;
let v = true
//Animate
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);


    if(l){
        if(cami != 0){
            neonText.classList.remove('fade-in');  
            neonText.classList.add('fade-out');
            startButtonElement.classList.remove('fade-in');  
            startButtonElement.classList.add('fade-out');
            gui.classList.add('fade-in');  
            gui.classList.remove('fade-out');
        }else{
            neonText.classList.remove('fade-out');  
            neonText.classList.add('fade-in');
            startButtonElement.classList.remove('fade-out');  
            startButtonElement.classList.add('fade-in');
            gui.classList.add('fade-out');  
            gui.classList.remove('fade-in');
            setTimeout(() => {
                startButtonElement.style="pointer-events: all";
                startButtonElement.classList.remove('fade-in');  
            }, 3000); 
            l = false
        }
    }

    
if(mountain && v){

    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        neonText.classList.add('fade-out-color');
    }, 1000); 
    v = false;
};

    
    //console.log(camera.position.x,camera.position.y,camera.position.z);
    

    if (t < 1 && targetIndex !== camPosIndex) {
        t += 0.005; // 0.005

        easeinout = easeInOutQuad(t);

        easeout = easeOutQuad(t);
    
        const factor = camPosIndex + easeinout * (targetIndex - camPosIndex);
        
        // Ensure that factor is between 0 and pathPoints.length - 1
        const clampedFactor = Math.max(0, Math.min(factor, pathPoints.length - 1));
    
        // Get the camera's position and direction along the spline
        const camPos = spline.getPointAt(clampedFactor / (pathPoints.length - 1));
        const camRot = spline.getTangentAt(clampedFactor / (pathPoints.length - 1));

        // Set the camera's position
        camera.position.set(camPos.x, camPos.y, camPos.z);


        if(cami != 1 && cami != 0 && cami != 3){
            smoothLookAt(new THREE.Vector3(camPos.x + camRot.x, camPos.y + camRot.y, camPos.z + camRot.z));
        }
        
        
        if (t > 0 && t < 1) {
            document.getElementById("nextPointButton").disabled = true;
            document.getElementById("prevPointButton").disabled = true;
            infoBox.classList.remove('glide-in');
            if(cami != 1 || camPosIndex == 2){
                infoBox.classList.add('glide-out');
            }
            if(camPosIndex !== 0){
                
                if (camera.fov != fov) {
                    camera.fov += (fov - camera.fov) * 0.1 * easeinout;  
                    camera.updateProjectionMatrix();
                }
                
            }
            
        }
        if (t >= 1) {
            camPosIndex = targetIndex;
            t = 0; 
            document.getElementById("nextPointButton").disabled = false;
            document.getElementById("prevPointButton").disabled = false;
            infoBox.classList.remove('glide-out');
            if(cami != 0){
                infoBox.classList.add('glide-in');            
            }
        }
    }
 
    if(cami == 0){
        smoothLookAt(new THREE.Vector3(0,0,0), true, 0.03 * easeout);

    }

    if(cami == 1 && camPosIndex != 2){
        smoothLookAt(new THREE.Vector3(DSbox3.position.x, DSbox3.position.y, DSbox3.position.z), false, 0.04 * easeinout);
        if (camera.fov !== 10) {
            camera.fov += (10 - camera.fov) * 0.03 * easeinout;  
            camera.updateProjectionMatrix();
        }
    }

    if(cami == 3 && camPosIndex != 4){
        smoothLookAt(new THREE.Vector3(chiralCrystal.position.x, chiralCrystal.position.y, chiralCrystal.position.z), false, 0.04 );
        if (camera.fov !== 10) {
            camera.fov += (10 - camera.fov) * 0.03 * easeinout;  
            camera.updateProjectionMatrix();
        }
    }
    

    if ((camPosIndex === 8 && cami === 8)) {
        smoothLookAt(new THREE.Vector3(BTlion.position.x, BTlion.position.y, BTlion.position.z), false);
    }
    
    const time = Date.now() * 0.001;
    const hoverOffsetY = Math.sin(time * 1.5) * 0.0005;
    camera.position.y += hoverOffsetY; 
}
document.getElementById("nextPointButton").addEventListener("click", smoothTransitionToNextPoint);
document.getElementById("prevPointButton").addEventListener("click", smoothTransitionToPrevPoint);
document.getElementById("startButton").addEventListener("click", startButton);
animate();
