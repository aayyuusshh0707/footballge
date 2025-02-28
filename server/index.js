const app = require("./app");
const dotenv = require("dotenv");
const { checkConnection } = require("./src/db/db");

dotenv.config();

const PORT = process.env.PORT || 3000;

checkConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB !!", error);
  });

//DB Connection ....done
//admin login ....done
//add links to button by admin (3 buttons) ....done
//add image to banner page by admin ....done
//add image to side1 page by admin ....done
//add image to side2 page by admin ....done
//add image to side3 page by admin ....done
//pin match by admin ....pending
