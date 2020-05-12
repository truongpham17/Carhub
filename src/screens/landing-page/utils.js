import remoteConfig from 'Constants/remote-config';

export function checkRemoteConfig() {
  if (!remoteConfig.lease_rate) {
    remoteConfig.lease_rate = 0.6;
    remoteConfig.rent_deposit = 0.3;
    remoteConfig.share_default_rate = 0.6;
    remoteConfig.share_deposit = 0.3;
    remoteConfig.usd_vnd = 23000;
  }
}
