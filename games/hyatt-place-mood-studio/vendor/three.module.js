/* Local compatibility bridge for the self-hosted Three.js r160 browser bundle. */
if (!window.THREE) throw new Error('Local Three.js bundle failed to initialize.');
export const THREE = window.THREE;
