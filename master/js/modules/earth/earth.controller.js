(function() {
  'use strict';

  angular
    .module('app.earth')
    .controller('EarthController', EarthController);

  EarthController.$inject = ['$rootScope', '$scope', '$state'];
  function EarthController($rootScope, $scope, $state) {
    $scope.autoLoop = true;
    var ROTATION_STEP = 0.015;

    // set the scene size
    var WIDTH = 800;
    var HEIGHT = 600;

    // Set some camera attributes
    var VIEW_ANGLE = 45;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 0.1;
    var FAR = 10000;

    // set up the sphere vars
    var radius = 50;
    var segments = 16;
    var rings = 16;

    var sphere;


    // create a WebGL renderer, camera
    // and a scene
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);


    // add the camera to the scene
    scene.add(camera);

    // the camera starts at 0,0,0
    // so pull it back
    camera.position.z = 300;

    $scope.cameraPosition = angular.copy(camera.position);

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    var loader = new THREE.TextureLoader();
    var texture = loader.load(
      // resource URL
      'app/images/earth.jpg',
      // Function when resource is loaded
      function (texture) {
        // do something with the texture
        createSphere(radius, segments, rings, texture);
      },
      // Function called when download progresses
      function (xhr) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
      // Function called when download errors
      function (xhr) {
        console.log('An error happened');
      }
    );

    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);

    // get the DOM element to attach to
    // - assume we've got jQuery to hand
    var $container = angular.element('#webgl-container');

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    function animate() {
      window.requestAnimationFrame(animate);
      drawLoop();
    }

    // draw!
    function drawLoop() {
      if($scope.autoLoop) {
        $scope.rotation = $scope.rotation || {};
        $scope.rotation.y = parseFloat($scope.rotation.y);
        if(!$scope.$$phase) {
          $scope.$apply(function() {
            $scope.rotation.y += ROTATION_STEP;
            $scope.rotation.y = $scope.rotation.y % 6.28;
          });
        }
      }

      if($scope.cameraPosition && camera.position.z !== $scope.cameraPosition.z) {
        camera.position.z = parseInt($scope.cameraPosition.z || 0);
      }


      if(sphere && $scope.rotation) {
        sphere.rotation.x = $scope.rotation.x || 0;
        sphere.rotation.y = $scope.rotation.y || 0;
        sphere.rotation.z = $scope.rotation.z || 0;
      }

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    function createSphere(radius, segments, rings, texture){

      // create the sphere's material
      var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });

      if(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        sphereMaterial = new THREE.MeshBasicMaterial({
          map: texture
        });
      }


      // create a new mesh with
      // sphere geometry - we will cover
      // the sphereMaterial next!
      sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);

      $scope.rotation = angular.copy(sphere.rotation);

      // add the sphere to the scene
      scene.add(sphere);
    }
  }

})();