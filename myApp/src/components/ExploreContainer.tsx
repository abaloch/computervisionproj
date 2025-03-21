import "./ExploreContainer.css";
import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    // Load the MobileNet model when the component mounts
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setIsModelLoaded(true);
    };

    const initializeTf = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('TensorFlow.js is ready with WebGL backend');
      } catch (error) {
        console.error('Error initializing WebGL backend:', error);
        console.log('Falling back to WASM backend');
        await tf.setBackend('wasm');
        await tf.ready();
        console.log('TensorFlow.js is ready with WASM backend');
      }
    };

    initializeTf();

    loadModel();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result !== undefined) {
          setSelectedImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (model && selectedImage) {
      const img = new Image();
      img.src = selectedImage as string;
      img.onload = async () => {
        const predictions = await model.classify(img);
        setPredictions(predictions);
      };
    }
  };

  const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!window.WebGLRenderingContext && !!canvas.getContext('webgl');
    } catch (e) {
      return false;
    }
  };

  console.log('WebGL available:', isWebGLAvailable());

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="progress progress-bar progress-bar-striped progress-bar-animated mb-2">
            Loading Model
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <input
            id="image-selector"
            className="form-control border 0"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-6">
          <button
            id="predict-button"
            className="btn btn-dark float-right"
            onClick={handlePredict}
            disabled={!isModelLoaded}
          >
            Predict
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <div className="col">
            <h2 className="ml-3">Predictions</h2>
            <ol id="predictions-list">
              {predictions.map((p, index) => (
                <li key={index}>
                  {p.className}: {p.probability.toFixed(2)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h2 className="ml-3">Image</h2>
          {selectedImage && (
            <img
              id="selected-image"
              className="ml-3"
              src={selectedImage as string}
              alt="Selected"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreContainer;
