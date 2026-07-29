import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import sequelize from './config/database';
// IMPORTANT: importing the models barrel registers all Sequelize associations
// (User.hasMany(Order), Product.belongsTo(Category), etc.). Without this import
// every query using `include:` throws "X is not associated to Y" at runtime.
import './models';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Ne jamais laisser une erreur asynchrone tuer le process (boucle de redémarrage)
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

async function start() {
  // En Docker, MySQL peut encore démarrer : on réessaie avant d'abandonner.
  const MAX = 15;
  for (let attempt = 1; attempt <= MAX; attempt++) {
    try {
      await sequelize.authenticate();
      console.log('✅ Base de données connectée.');
      break;
    } catch (err) {
      console.error(`⏳ Connexion BDD échouée (${attempt}/${MAX}) : ${(err as Error).message}`);
      if (attempt === MAX) {
        console.error('⚠️  Démarrage sans base de données.');
      } else {
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }

  if (process.env.DB_SYNC === 'true') {
    try {
      // sync() simple : crée les tables manquantes sans ALTER destructif
      // (alter:true peut échouer sur MySQL : index dupliqués, contraintes FK).
      await sequelize.sync();
      console.log('✅ Tables synchronisées.');
    } catch (err) {
      console.error('⚠️  Sync BDD échouée (le serveur démarre quand même) :', (err as Error).message);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default app;
