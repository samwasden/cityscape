const scene = new THREE.Scene();
let colorStr = "rgb(30%, 37%, 50%)"
scene.background = new THREE.Color( colorStr );

let buildingColors = [0xe5e8e7,0xd8dddc,0xd2d8d6,0xcbd2d0]

let slider = document.querySelector('#timeChange')

let links = {"randomTree": "https://wasden-app.herokuapp.com/"}

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 0;
camera.position.y = 10

camera.rotation.x = -.3;

let starsGroup = new THREE.Group()

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight*.85 );
renderer.setPixelRatio( window.devicePixelRatio );

document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( colorStr, 0.5 );
scene.add( ambientLight);

const light = new THREE.DirectionalLight( 0xE8E8E8, 1 );

light.position.set(20, 120, 0);

scene.add( light );

let titlebox = document.getElementById("titleBox")
let title = document.getElementById("title")
console.log()
titlebox.addEventListener("mouseover", () => {
    title.textContent = "other projects"
})

titlebox.addEventListener("mouseout", () => {
    title.textContent = "cityscape"
})

function layout() {
    let posX = -60
    for (let i=0; i<18; i++) {
        let count = 0
        for (let j=0; j<40; j++) {
            let building = createBuilding()
            building.position.z = i * -3
            building.position.x = posX + (j*3)
            scene.add(building)
            count++
        }
    }
    let plane = createPlane()
    plane.rotation.x = -1.5708
    scene.add(plane)
    let mountZ = -80
    let mountX = -140
    for (let k=0; k<3; k++) {
        for(let l=0; l<20; l++) {
            let mountain = createMountain()
            mountain.position.z = mountZ - (k*(Math.random()*10))
            mountain.position.x = mountX + (l*(Math.random()*10 +10))
            scene.add(mountain)
        }
    }
    let starX = -200
    let starZ = -200
    let starY = 20
    for (let m=0; m<200; m++) {
        let star = createStar()
        star.position.x = Math.random() * 400 + starX
        star.position.y = Math.random() * 100 + starY
        star.position.z = Math.random() * 50 + starZ
        starsGroup.add(star);
    }
}



function createMountain() {
    const height = Math.random() * 40
    const width = Math.random() * 20 + 40
    const mGeometry = new THREE.ConeGeometry(width, height, 8+Math.random()*8)
    const mMaterial = new THREE.MeshLambertMaterial( { color: 0xadb5bd} )
    const mountain = new THREE.Mesh( mGeometry, mMaterial );
    return mountain
}

function createBuilding() {
    let height
    if (Math.random() < .05) {
        height = Math.random() * 16 + 2
    } else {
        height = Math.random() * 8 + 1
    }
    const bGeometry = new THREE.BoxGeometry(Math.random()/2 + 1.75, height, Math.random()/2 + 1.75);
    const bMaterial = new THREE.MeshLambertMaterial( { color: buildingColors[Math.floor(Math.random() * 4)] } );
    const building = new THREE.Mesh( bGeometry, bMaterial );
    return building
}

function createPlane() {
    const pGeometry = new THREE.PlaneGeometry(200, 200);
    const pMaterial = new THREE.MeshLambertMaterial( { color: 0x111111 } );
    const plane = new THREE.Mesh( pGeometry, pMaterial );
    return plane
}

function createStar() {
    const sGeometry = new THREE.SphereGeometry(.2);
    const sMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    const star = new THREE.Mesh( sGeometry, sMaterial)
    return star
}

const airplaneGroup = new THREE.Group()

let prop
let currentPlane = false

function createAirplane(len) {
    let topWing = createWing(len)
    let bottomWing = createWing(len)
    let body = createBody(len *.75, len*.1)
    let nose = createBody(len *.25, len*.1)
    let tail = createWing(len*.5)
    let fin = createWing(len*.25, len*.125)
    prop = createWing(len*.25, len*.02)
    body.rotation.x = 1.5708
    nose.rotation.x = -1.5708
    nose.position.z = len*-.5
    topWing.position.z = len*-.25
    topWing.position.y = len*.125
    bottomWing.position.z = len*-.25
    bottomWing.position.y = len*-.0625
    tail.position.z = len*.3
    tail.position.y = len*.06
    fin.position.z = len*.3
    fin.position.y = len*.08
    fin.rotation.z = 1.5708
    fin.rotation.x = .3
    prop.position.z = len*-.6


    airplaneGroup.add(topWing)
    airplaneGroup.add(bottomWing)
    airplaneGroup.add(body)
    airplaneGroup.add(nose)
    airplaneGroup.add(tail)
    airplaneGroup.add(fin)
    airplaneGroup.add(prop)

    airplaneGroup.position.y = 14
    airplaneGroup.position.x = 70
    airplaneGroup.position.z = -40
    airplaneGroup.rotation.y = 1.5608
    scene.add(airplaneGroup)
}

function createWing(len, width = len/4) {
    let wGeometry = new THREE.BoxGeometry(len, .1, width)
    let wMaterial = new THREE.MeshLambertMaterial( { color: "red" } );
    let wing = new THREE.Mesh(wGeometry, wMaterial)
    return wing
}

function createBody(len, width) {
    let aGeometry = new THREE.CylinderGeometry(width*.66, width, len)
    let aMaterial = new THREE.MeshLambertMaterial( { color: "red" } );
    let airbody = new THREE.Mesh(aGeometry, aMaterial)
    return airbody
}


layout()

starsGroup.position.y = 0
scene.add(starsGroup)

slider.addEventListener("input", (e) => {
    let change = e.target.value;
    let colorString = `rgb(${Math.floor(change*.6)}%, ${Math.floor(change*.75)}%, ${change}%)`;
    scene.background = new THREE.Color( colorString );
    light.position.x = change-30;
    light.position.z = change-50;
    starsGroup.position.y = change-50
    ambientLight.intensity = change/200;
    renderer.render( scene, camera );
})

let button = document.getElementById("button")
button.addEventListener("click", (e) => {
    e.preventDefault()
    createAirplane(4)
    currentPlane = true
})



const animate = function () {
    requestAnimationFrame( animate );
    
    if (currentPlane) {
        airplaneGroup.rotation.z += 0.01
        prop.rotation.z += 0.5
        airplaneGroup.position.x -= 0.2
    }
    if (airplaneGroup.position.x < -200) {
        scene.remove(airplaneGroup)
        currentPlane = false
    }
    

    renderer.render( scene, camera );
};

animate();

