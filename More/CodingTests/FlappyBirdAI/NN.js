function sigmoid(x, i, j)
{
    return 1 / (1 + Math.exp(-x));
}
function dsigmoid(y, i, j)
{
    //return sigmoid(x) * (1 - sigmoid(x));
    return y * (1 - y);
}

function mutation(x)
{
    if (Math.random() >= 0.7) 
    {
        return x + (Math.random() - 0.5) * 2;
    }
    else
    {
        return x;
    }

}

class NeuralNetwork
{
    constructor(input_nodes, hidden_nodes, output_nodes, learning_rate)
    {

        if (input_nodes instanceof NeuralNetwork) {
            let a = input_nodes;
            this.input_nodes = a.input_nodes;
            this.hidden_nodes = a.hidden_nodes;
            this.output_nodes = a.output_nodes;
      
            this.weights_ih = a.weights_ih.copy();
            this.weights_ho = a.weights_ho.copy();
      
            this.bias_h = a.bias_h.copy();
            this.bias_o = a.bias_o.copy();
        } 
        else 
        {
            this.input_nodes = input_nodes;
            this.hidden_nodes = hidden_nodes;
            this.output_nodes = output_nodes;

            // Create weights using number of Input, Hidden, and Output Nodes.
            this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
            this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

            // Give each weight a random value
            this.weights_ih.randomize();
            this.weights_ho.randomize();

            // Create Bias Weights
            this.bias_h = new Matrix(this.hidden_nodes, 1);
            this.bias_o = new Matrix(this.output_nodes, 1);

            // Randomize Bias Weights
            this.bias_h.randomize();
            this.bias_o.randomize();

            // Set how much the weights get changed in training
            this.learning_rate = learning_rate;
        }
    }

    feedForward(input_array) 
    {

        // Turn the given Array into a Matrix
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        // Pass the hidden Matrix through an Activation Function, squashing the number into a range of 0 and 1
        hidden.map(sigmoid);
        // Do the same thing for the output
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        // Return the final output
        
        return output.toArray();
        
    }

    copy()
    {
        return new NeuralNetwork(this);
    }

    mutate() {
        let nn = new NeuralNetwork(this);
        nn.weights_ih.map(mutation);
        nn.weights_ho.map(mutation);
        nn.bias_h.map(mutation);
        nn.bias_o.map(mutation);
        return nn;
    }
    


    serialize()
    {
        save(JSON.stringify(this), "brain.json");
    }

    static deserialize(data) {
        if (typeof data == 'string') {
          data = JSON.parse(data);
        }
        let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes, data.learning_rate);
        nn.weights_ih = Matrix.deserialize(data.weights_ih);
        nn.weights_ho = Matrix.deserialize(data.weights_ho);
        nn.bias_h = Matrix.deserialize(data.bias_h);
        nn.bias_o = Matrix.deserialize(data.bias_o);
        return nn;
    }


    train(input_array, target)
    {
        // Gets the Neural Network's guess and turns it into a Matrix

        // Copy of feedForward() for conveinience

            let inputs = Matrix.fromArray(input_array);
            let hidden = Matrix.multiply(this.weights_ih, inputs);
            hidden.add(this.bias_h);
            // Pass the hidden Matrix through an Activation Function, squashing the number into a range of 0 and 1
            hidden.map(sigmoid);

            // Do the same thing for the output
            let outputs = Matrix.multiply(this.weights_ho, hidden);
            outputs.add(this.bias_o);
            outputs.map(sigmoid);

        // Turn targets into a Matrix
        let targets = Matrix.fromArray(target);
        // Calculate output error as correct answer - NN's guess
        let output_errors = Matrix.subtract(targets, outputs);
        // Pass outputs through the dsigmoid function, multiply it by the errors and the learning rate (Calculate gradient)
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);

        // Calculate Deltas
        let hidden_T = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(gradients, hidden_T);


        // Ajust Weights by Deltas
        this.weights_ho.add(weights_ho_deltas);
        // Ajust Bias by its Deltas (the Gradients)
        this.bias_o.add(gradients);

        // Calculate the errors for the Hidden Nodes
        // Transpose the Hidden weights for error calculation
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);
        
        // All that stuff but again for the other weights
        let hidden_gradients = Matrix.map(hidden, dsigmoid);
        hidden_gradients.multiply(hidden_errors);
        hidden_gradients.multiply(this.learning_rate);

        let inputs_T = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradients, inputs_T);

        this.weights_ih.add(weights_ih_deltas);
        this.bias_h.add(hidden_gradients);
        

    }

}

