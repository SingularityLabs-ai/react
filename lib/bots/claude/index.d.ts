import { AsyncAbstractBot } from '../abstract-bot';
import { ClaudeApiBot } from '../claude-api';
import { PoeWebBot } from '../poe';
export declare class ClaudeBot extends AsyncAbstractBot {
    initializeBot(): Promise<PoeWebBot | ClaudeApiBot>;
}
