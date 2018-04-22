    var turtle_mode;    
		window.onload=function() {
            

            moveTurtle();
            setDefault();
			document.getElementById("console").onchange = function() {
				keyPush();
                moveTurtle();
			}
		}

        function setDefault(){
            turtle_mode = true;
            let canv=document.getElementById("gc");
			let ctx=canv.getContext("2d");
            ctx.lineWidth = 0.5;
            ctx.lineJoin = "square";
            ctx.strokeStyle = "black";
            
        }

		function keyPush() {

			var command = document.getElementById("console").value;
			console.log(command);
			var array = command.split(" ");


			if(array[0] == "forward"){
				forward(parseInt(array[1]));
			}
			else if(array[0] == "clear"){
				clear();
			}
			else if(array[0] == "goto"){
				goto(parseInt(array[1]),parseInt(array[2]));
			}
            else if(array[0] == "left"){
                left(parseInt(array[1]));
            }
            else if(array[0] == "right"){
                right(parseInt(array[1]));
            }
            else if(array[0] == "color"){
                color(array[1]);
            }
            else if(array[0] == "on"){
                on();
            }
            else if(array[0] == "off"){
                off();
            }

            clearInput();
		}
        
        function clearInput(){
            document.getElementById("console").value = '';
        }
        
        let canv = document.getElementById("gc");
        
        var image = new Image();
        image.src = 'img/turtle.png';
        var x = canv.width / 2;
		var y = canv.height / 2;
        console.log(canv.width);
        console.log(x);
        var angle = 0;
        
        

        function moveTurtle() {
            let ctx = canv.getContext("2d");
            canv.width = canv.width;
            ctx.rect(x,y,10,10);
            ctx.stroke();
        }
    
        

		function forward(length){
			
			var posX = Math.cos((angle)* Math.PI/180);
			var posY = Math.sin((angle)* Math.PI/180);

            var newX = x + (posX * length);
            var newY = y + (posY * length);
            
            if(turtle_mode == true){
                let canv=document.getElementById("gc");
                let ctx=canv.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(newX,newY);
                ctx.stroke();
            }

            x = newX;
            y = newY;
            console.log(newX+" "+newY);
		}

		function clear(){
			let canv=document.getElementById("gc");
			let ctx=canv.getContext("2d");
			ctx.beginPath();
			ctx.clearRect(0,0,900,650);
			ctx.stroke();
            x = canv.width / 2;
            y = canv.height / 2;
            
		} 
		function goto(newX,newY){
			
            var a = ((y) - (canv.height - newY))/(x - newX);
            var degree = (Math.atan(a))*180/Math.PI;
            
            console.log(degree);
            left(degree + 180);

            if(turtle_mode == true){
                let canv=document.getElementById("gc");
                let ctx=canv.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(newX,canv.height - newY);
                ctx.stroke();
            }

            x = newX;
            y = canv.height - newY;
		}

        function left(deg){
            
            angle = (angle - deg) % 360;
            console.log(angle);
        }

        function right(deg){
            angle = Math.abs(360 + angle + deg) % 360;
            console.log(angle);
        }

        function color(col){
            let canv = document.getElementById("gc");
            let ctx = canv.getContext("2d");
            var colorVal = document.getElementById("colorV");
            colorVal.style.color = col;
		    ctx.beginPath();
		    ctx.strokeStyle = col;
		    ctx.stroke();
        }

        function on(){
            turtle_mode = true;
            document.getElementById("on").innerHTML = "on &#x22B2;-";
            document.getElementById("off").innerHTML = "off";
        }

        function off(){
            console.log("turtle off");
            turtle_mode = false;
            document.getElementById("off").innerHTML = "off &#x22B2;-";
            document.getElementById("on").innerHTML = "on";
        }