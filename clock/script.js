window.addEventListener("resize", resize);
import gsap from "gsap";
var scene;
var camera;
var renderer;
var time = [];

var list = [];
list[0] = [];
list[1] = [];
list[2] = [];
list[3] = [];
list[4] = [];
list[5] = [];
list[0]["offset"] = 0;
list[1]["offset"] = 6;
list[2]["offset"] = 14;
list[3]["offset"] = 20;
list[4]["offset"] = 28;
list[5]["offset"] = 34;

var offset;
var numbers = [[
        [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,1,1],
    ],[
        [0,0,1],
        [0,1,1],
        [0,0,1],
        [0,0,1],
        [0,0,1]
    ],[
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [1,0,0],
        [1,1,1]
    ],[
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1],
    ],[
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [0,0,1],
    ],[
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [0,0,1],
        [1,1,1],
    ],[
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [1,0,1],
        [1,1,1],
    ],[
        [1,1,1],
        [0,0,1],
        [0,0,1],
        [0,0,1],
        [0,0,1],
    ],[
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,1,1],
    ],[
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1],
    ]];

    init();


function resize(){
  document.body.innerHTML ="";
  init();
}

function init(){
        
        document.querySelector("body").innerHTML = "";
        scene = new THREE.Scene();
        var aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera( 20, aspect, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild(renderer.domElement);
        camera.position.z = 70;
        camera.position.y = -5;
        camera.position.x = -15;
        camera.rotation.y = THREE.Math.degToRad(0);
        light1 = new THREE.DirectionalLight( 0xffffff, 1 );
        light1.position.set( -150, 80, 80);
        light2 = new THREE.AmbientLight(0xffffff, 0.5);
        var geometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x202020 } );
        var floor = new THREE.Mesh( geometry, material );
        scene.add(light2, floor);
        scene.add(light1);
        setupGrid();
        render();
    }

function setupGrid(){
      for(var i=0; i<6; i++){
            for(var x = 0; x < 3;  x++){
                for(var y = 0; y < 5; y++){
                    var cube = new THREE.Mesh( new THREE.CubeGeometry( 1 , 1 , 1 ), new THREE.MeshLambertMaterial({color: 0xffffff}));
                    cube.position.y = y * -1.5;
                    cube.position.x = x * 1.5 - list[i]["offset"];
                    cube.position.z = 1;
                    scene.add(cube);
                    list[i].push(cube);
                  
                }
            }
        }
    }


function update(){
  var date = new Date();
  var secsUnits = date.getSeconds().toString();
  secsUnits = secsUnits.charAt(secsUnits.length -1);
  secsUnits = parseInt(secsUnits);
  var secsDecs = date.getSeconds().toString();
  if(secsDecs.length == 1){
    secsDecs = 0;
  }else{
    secsDecs = parseInt(secsDecs.charAt(0));
  }
  var minutesUnits = date.getMinutes().toString();
  minutesUnits = minutesUnits.charAt(minutesUnits.length -1);
  minutesUnits = parseInt(minutesUnits);
  var minutesDecs = date.getMinutes().toString();
  if(minutesDecs.length == 1){
    minutesDecs = 0;
  }else{
    minutesDecs = parseInt(minutesDecs.charAt(0));
  }
  
  var hoursUnits = date.getHours().toString();
  hoursUnits = hoursUnits.charAt(hoursUnits.length -1);
  hoursUnits = parseInt(hoursUnits);
  var hoursDecs = date.getHours().toString();
  if(hoursDecs.length == 1){
    hoursDecs = 0;
  }else{
    hoursDecs = parseInt(hoursDecs.charAt(0));
  }
  
  time[0] = secsUnits;
  time[1] = secsDecs;
  time[2] = minutesUnits;
  time[3] = minutesDecs;
  time[4] = hoursUnits;
  time[5] = hoursDecs;
  
    for(var i = 0; i < 6; i++){
        for( var j = 0; j < list[i].length; j++){
            var y = -list[i][j].position.y / 1.5 ;
            var x = (list[i][j].position.x + list[i]["offset"]) / 1.5;
             
            if (numbers[time[i]][y][x] != 1) {
               TweenMax.to(list[i][j].scale, 1, { x:0,y:0,z:0 }, 400 );
                TweenMax.to(list[i][j].rotation, 0.5, {y:Math.PI/2} , 400 );
              TweenMax.to(list[i][j].rotation, 0.5, {z:Math.PI/2} , 400 );

            } else {
               TweenMax.to(list[i][j].scale, 1, { x:1,y:1,z:1 }, 400 );
              TweenMax.to(list[i][j].rotation, 0.5, {y:-Math.PI/2} , 400 );
              TweenMax.to(list[i][j].rotation, 0.5, {z:-Math.PI/2} , 400 );
            }
        }
    }
}

    function render() {
        requestAnimationFrame( render );
        update();
        renderer.render( scene, camera );
    };



