// $("#image-selector").change(function () {
//   let reader = new FileReader();
//   reader.onload = function () {
//     let dataURL = reader.result;
//     $("#selected-image").attr("src", dataURL);
//     $("#prediction-list").empty();
//   };
//   let file = $("#image-selector").prop("files")[0];
//   reader.readAsDataURL(file);
// });

// let model;
// (async function () {
//   try {
//     model = await tf.loadGraphModel('https://cors-anywhere.herokuapp.com/https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/3/default/1');
//     console.log("MobileNet V2 model loaded successfully:", model);
//   } catch (error) {
//     console.error("Error loading the MobileNet V2 model:", error);
//   }
// })();

// $("#predict-button").click(async function () {
//   if (!model) {
//     alert("Model is not loaded yet. Please try again later.");
//     return;
//   }
//   try {
//     let image = $("#selected-image").get(0);
//     let tensor = tf.browser.fromPixels(image)
//       .resizeNearestNeighbor([224, 224])
//       .toFloat()
//       .div(tf.scalar(127.5))
//       .sub(tf.scalar(1))
//       .expandDims();

//     let predictions = await model.predict(tensor).data();
//     let top5 = Array.from(predictions)
//       .map((p, i) => ({
//         probability: p,
//         className: IMAGENET_CLASSES[i],
//       }))
//       .sort((a, b) => b.probability - a.probability)
//       .slice(0, 5);

//     $("#predictions-list").empty();
//     top5.forEach(p => {
//       $("#predictions-list").append(
//         `<li>${p.className}: ${p.probability.toFixed(6)}</li>`
//       );
//     });
//   } catch (error) {
//     console.error("Error during prediction:", error);
//     alert("Prediction failed. Please check the console for more details.");
//   }
// });
