import { envs } from '@shared/envs';
import { logger } from '@shared/providers/logger/implementations/PinoProvider';

import { httpServer } from './app';

httpServer.listen(envs.PORT, () => {
    logger.info(`Server running on port ${envs.PORT}`);
});

