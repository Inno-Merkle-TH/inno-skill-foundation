export function preflight(input: { platform: string; host: string; device: string; appExists: boolean; hashValid: boolean; toolsAvailable: boolean }): string[] {
  const errors: string[] = [];
  if (!['android', 'ios'].includes(input.platform)) errors.push('Choose android or ios');
  if (input.platform === 'ios' && input.host !== 'darwin') errors.push('iOS requires macOS with Xcode');
  if (!input.device.trim()) errors.push('Set an explicit device UDID');
  if (!input.appExists) errors.push('Set MOBILE_APP_PATH to an existing app');
  if (!input.hashValid) errors.push('Verify the pinned release archive SHA256');
  if (!input.toolsAvailable) errors.push('Install approved platform tools and select an available device');
  return errors;
}
