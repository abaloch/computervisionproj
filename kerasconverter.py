import keras
import tensorflow as tf

# vgg16 = keras.applications.VGG16()

# tfjs.converters.save_keras_model(vgg16, '/static/tfjs-models/VGG16')


   # Load the pre-trained MobileNet model
model = tf.keras.applications.MobileNetV2(weights='imagenet', input_shape=(224, 224, 3))

   # Save the model in the SavedModel format
model.save('mobilenet_v2_saved_model')