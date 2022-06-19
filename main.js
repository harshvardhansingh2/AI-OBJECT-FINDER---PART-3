status = "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++)
        {
            if(objects[0].label == object)
            {
                object = document.getElementById("object_detected").innerText = "mentioned object dectected";
                video.stop();
                objectDetector.detect(gotResults);
            }
            else {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerText = "Status : Detecting Objects";
    object = document.getElementById("object").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}