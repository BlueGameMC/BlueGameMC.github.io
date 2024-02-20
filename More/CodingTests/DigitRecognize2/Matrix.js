class Matrix
{

    constructor(rows, cols)
    {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        if(rows == null || cols == null)
        {
            console.error("Matrix needs rows and cols!");
        }

        //Initalize rows and collumns
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
        
        randomize()
        {
            for (let i = 0; i < this.rows; i++) {   
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] = Math.random() * 2 - 1;
                }
            }
        }
        
        multiply(n)
        {

            if (n instanceof Matrix) {
                if (this.rows !== n.rows || this.cols !== n.cols) {
                  console.log('Columns and Rows of A must match Columns and Rows of B.');
                  return;
                }
          
                // hadamard product
                return this.map((e, i, j) => e * n.data[i][j]);
            }
            else
            {
                for (let i = 0; i < this.rows; i++) 
                {   
                    for (let j = 0; j < this.cols; j++) 
                    {
                        this.data[i][j] *= n;
                    }
                }
            }
        }

        map(func)
        {
            for (let i = 0; i < this.rows; i++) {   
                for (let j = 0; j < this.cols; j++) {
                    let val = this.data[i][j];
                    this.data[i][j] = func(val, i, j);
                }
            }
        
        }

        static map(m, func)
        {
            let matrix = new Matrix(m.rows, m.cols);
            for (let i = 0; i < matrix.rows; i++) {   
                for (let j = 0; j < matrix.cols; j++) {
                    let val = m.data[i][j];
                    matrix.data[i][j] = func(val);
                }
            }

            return matrix;
        
        }
        
        add(n)
        {
            
            if (n instanceof Matrix) 
        {
            if (n.rows == this.rows && n.cols == this.cols) 
            {
                for (let i = 0; i < this.rows; i++) {   
                    for (let j = 0; j < this.cols; j++) {
                        this.data[i][j] += n.data[i][j];
                    }
                }
            }
            else
            {
                console.error("Matrix dimensions must match!");
            }
        }
        else
        {            
            for (let i = 0; i < this.rows; i++) {   
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
        }

        subtract(n)
        {
            
            if (n instanceof Matrix) 
        {
            if (n.rows == this.rows && n.cols == this.cols) 
            {
                for (let i = 0; i < this.rows; i++) {   
                    for (let j = 0; j < this.cols; j++) {
                        this.data[i][j] -= n.data[i][j];
                    }
                }
            }
            else
            {
                console.error("Matrix dimensions must match!");
            }
        }
        else
        {            
            for (let i = 0; i < this.rows; i++) {   
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= n;
                }
            }
        }
        }

        static subtract(n1, n2)
        {
            let result = new Matrix(n1.rows, n1.cols);
            if (n1.rows == n2.rows && n1.cols == n2.cols) 
            {
                for (let i = 0; i < n1.rows; i++) {   
                    for (let j = 0; j < n2.cols; j++) {
                        result.data[i][j] = n1.data[i][j] - n2.data[i][j];
                    }
                }
            }
            else
            {
                console.error("Matrix dimensions must match!");
            }

            return result;

        }

    table()
    {
        console.table(this.data);
    }
    
    static deserialize(data) {
        if (typeof data == 'string') {
          data = JSON.parse(data);
        }
        let matrix = new Matrix(data.rows, data.cols);
        matrix.data = data.data;
        return matrix;
      }

    static transpose(m)
    {
        let c = new Matrix(m.cols, m.rows);
        for (let i = 0; i < c.rows; i++) {   
            for (let j = 0; j < c.cols; j++) {
                c.data[i][j] = m.data[j][i];
            }
        }
        return c;
    }

    static multiply(m1, m2)
    {
        if (m1.cols !== m2.rows) 
        {
            console.error("A.rows must match B.cols!");
            return undefined;
        }

        let result = new Matrix(m1.rows, m2.cols);
        let a = m1;
        let b = m2;
        for (let i = 0; i < result.rows; i++) {   
            for (let j = 0; j < result.cols; j++) {
                //Dot product
                let sum = 0;        
                for (let k = 0; k < m1.cols; k++) { 
                    sum += m1.data[i][k] * m2.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }

        return result;
    }

    static fromArray(arr)
    {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    toArray()
    {
        let arr = [];
        for (let i = 0; i < this.cols; i++) {   
            for (let j = 0; j < this.rows; j++) {
                arr.push(this.data[j][i]);
            }
        }
        return arr;
    }

}
