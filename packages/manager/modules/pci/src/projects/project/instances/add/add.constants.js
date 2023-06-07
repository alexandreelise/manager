export const BANDWIDTH_OUT = 'bandwidth_instance_out.consumption';
export const FILTER_PRIVATE_NETWORK_BAREMETAL = 'ovh.baremetal';

export const INSTANCE_MODES_ENUM = [
  { mode: 'public_mode' },
  { mode: 'private_mode' },
];

export const AVAILABLE_SUBNET = [
  '192.168.0.1/24',
  '10.0.0.1/24',
  '172.16.0.1/24',
];
export const INSTANCE_READ_MORE_GUIDE = {
  ALL_GUIDE: {
    DEFAULT:
      'https://docs.ovh.com/gb/en/public-cloud/attaching-pci-floating-ip-to-instance/',
  },
};
export const WINDOWS_PRIVATE_MODE_LICENSE_GUIDE = {
  en_GB:
    'https://docs.ovh.com/gb/en/public-cloud/activate-windows-licence-private-mode-instance/',
  en_CA:
    'https://docs.ovh.com/ca/en/public-cloud/activate-windows-licence-private-mode-instance/',
  en_US:
    'https://docs.ovh.com/us/en/public-cloud/activate-windows-licence-private-mode-instance/',
  en_AU:
    'https://docs.ovh.com/au/en/public-cloud/activate-windows-licence-private-mode-instance/',
  fr_FR:
    'https://docs.ovh.com/fr/public-cloud/activate-windows-licence-private-mode-instance/',
  fr_CA:
    'https://docs.ovh.com/ca/fr/public-cloud/activate-windows-licence-private-mode-instance/',
  de_DE:
    'https://docs.ovh.com/de/public-cloud/activate-windows-licence-private-mode-instance/',
  es_ES:
    'https://docs.ovh.com/es/public-cloud/activate-windows-licence-private-mode-instance/',
  it_IT:
    'https://docs.ovh.com/it/public-cloud/activate-windows-licence-private-mode-instance/',
  pt_PT:
    'https://docs.ovh.com/pt/public-cloud/activate-windows-licence-private-mode-instance/',
  ASIA:
    'https://docs.ovh.com/asia/en/public-cloud/activate-windows-licence-private-mode-instance/',
  DEFAULT:
    'https://docs.ovh.com/gb/en/public-cloud/activate-windows-licence-private-mode-instance/',
};

export const FLOATING_IP_AVAILABILITY_INFO_LINK =
  'https://www.ovhcloud.com/en/public-cloud/regions-availability/';

export const FLAVORS_BAREMETAL = /baremetal/;

export const PUBLIC_NETWORK = 'Ext-Net';
export const PUBLIC_NETWORK_BAREMETAL = 'Ext-Net-Baremetal';

export default {
  BANDWIDTH_OUT,
  INSTANCE_MODES_ENUM,
  AVAILABLE_SUBNET,
  INSTANCE_READ_MORE_GUIDE,
  FILTER_PRIVATE_NETWORK_BAREMETAL,
  FLAVORS_BAREMETAL,
  PUBLIC_NETWORK,
  PUBLIC_NETWORK_BAREMETAL,
};
