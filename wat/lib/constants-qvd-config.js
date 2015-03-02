QVD_CONFIG_HELP = {
    'admin.ssh.opt.StrictHostKeyChecking': 'Unused',
    'admin.ssh.opt.UserKnownHostsFile': 'Unused',
    'auth.ldap.host':  '(Required). Can be a host or an LDAP uri as specified in Net::LDAP',
    'auth.ldap.base':  '(Required). The search base where to find the users with the auth.ldap.filter (see below)',
    'auth.ldap.filter':  '(Optional by default (uid=%u)). The string %u will be substituted with the login name',
    'auth.ldap.binddn':  '(Optional by default empty). The initial bind to find the users. By default the initial bind is done as anonymous unless this parameter is specified. If it contains the string %u, that is substituted with the login',
    'auth.ldap.bindpass':  '(Optional by default empty). The password for the binddn',
    'auth.ldap.scope':  '(Optional by default base). See the Net::LDAP scope attribute in the search operation. If this is empty the password provided in during the authentication is used',
    'auth.ldap.userbindpattern':  '(Optional by default empty). If specified an initial bind with this string is attempted. The login attribute is substituted with %u.',
    'auth.ldap.deref':  '(Optional by default never). How aliases are dereferenced, the accepted values are never, search, find and always. See Net::LDAP for more info.',
    'auth.ldap.racf_allowregex':  '(Optional by default not set). This is a regex to allow to authenticate some RACF error codes. An example setting would be "^R004109 ". One of the common cases is R004109 which returns an ldap code 49 (invalid credentials) and a text message such as "R004109 The password has expired (srv_authenticate_native_password))". If you don’t have RACF this is probably not for you. Example RACF errors:<br><br>R004107 The password function failed; not loaded from a program controlled library.<br>R004108 TDBM backend password API resulted in an internal error.<br>R004109 The password has expired.<br>R004110 The userid has been revoked.<br>R004128 Native authentication password change failed. The new password is not valid or does not meet requirements.<br>R004111 The password is not correct.<br>R004112 A bind argument is not valid.<br>R004118 Entry native user ID (ibm-nativeId,uid) is not defined to the Security Server.',
    'client.link': 'Can be: modem, isdn, adsl, wan, lan, local or a bandwidth specification (56k, 1m, 100m…)',
    'client.geometry': 'Used to report the size and the depth of the client display, if unset use full screen',
    'client.fullscreen': 'Used to run the client in fullscreen mode',
    'client.slave.enable': 'Whether or not to enable the slave channel, used by the shared folder feature. Enabled by default',
    'client.slave.command': 'Point the QVD client machine to the slave client binary or an alternative',
    'client.audio.enable': 'Used to enable the PulseAudio server in the client. Can also be configured in the OSF',
    'client.printing.enable': 'Used to enable Printer sharing with the client. Can also be configured in the OSF',
    'client.host.port': 'The L7R port the client should connect to (this setting relates to the l7r.port setting configured for your server nodes)',
    'client.host.name': 'The L7R host the client should connect to (usually the frontend IP address of a loadbalancer)',
    'client.user.name': 'The user name for client authentication',
    'client.use_ssl': 'Whether or to use SSL in client-server communications. Enabled by default',
    'client.force.host.name': 'Forces the hostname available to the client, so that it is only able to connect to this host',
    'client.force.link': 'Forces the client link parameter, so that it is not possible to select an alternative option within the GUI.',
    'client.remember_password': 'Controls whether or not the client remembers the password used for the previous connection',
    'client.show.remember_password': 'Controls whether or not the option to Remember Password is displayed within the GUI.',
    'client.show.settings': 'Shows the settings tab on the client',
    'client.remember_password': 'Whether to remember password after successful connection',
    'client.remember_username': 'Whether to remember the username after a successful connection',
    'client.show.remember_password': 'Whether to show the previous checkbox or not',
    'client.show.settings': 'Whether to show the settings tab',
    'client.link': 'Nxproxy\'s link parameter, can be: modem, isdn, adsl, wan, lan, local or a bandwidth specification (56k, 1m, 100m...)',
    'client.nxproxy.extra_args': 'Extra arguments to nxproxy.',
    'client.nxagent.extra_args': 'Extra arguments to nxagent. Allows non-standard configurations, like defining custom link types. Sent to the VM side and applied there.',
    'client.sshfs.extra_args': 'Extra arguments for sshfs. These have been determined as reasonable defaults.',
    'client.geometry': 'Nxproxy\'s geometry parameter',
    'client.fullscreen': 'Nxproxy\'s fullscreen parameter',
    'client.audio.enable': 'Enable the Pulse audio server in the client',
    'client.printing.enable': 'Something regarding an NX channel',
    'client.host.port': 'L7R port the client should connect to',
    'client.host.name': 'L7R host the client should connect to',
    'client.user.name': 'User name for client authentication',
    'client.use_ssl': 'Whether to use SSL in the client↔server communication or not',
    'client.ssl.use_cert': 'Whether to use SSL certificate in the client↔server communication or not',
    'client.slave.command': 'Slave shell command',
    'client.slave.client': 'Slave shell client path',
    'client.slave.enable': 'Enable making slave connections to VM',
    'client.locale': 'Force locale, ignoring system LC_* and LANG environment variables',
    'client.darwin.screen_resolution.verified': 'Check whether we should default to a lower window size on OSX.',
    'client.darwin.screen_resolution.min': 'When the screen resolution is this or less, use the low geometry setting',
    'client.darwin.screen_resolution.low_res_geometry': 'Geometry to use when the screen is low resolution',
    'client.usb.enable': 'Enable USB sharing',
    'client.usb.share_all': 'Share all USB devices automatically (most of the time not a good idea)',
    'client.usb.share_list': 'List of USB devices to share with the VM. Syntax: VID:PID, comma separated. Spaces are allowed. For example: 0441:0012, 1234:5678',
    'database.host': 'Where the QVD database is found',
    'database.name': 'The name of the QVD database',
    'database.user': 'The user account needed to connect',
    'database.password': 'The password needed to connect',
    'hkd.user.umask': 'umask for the HKD process',
    'hkd.as_user': 'User to run hkd as',
    'hkd.pid_file': 'Path to the hkd PID file',
    'hkd.vm.starting.max': 'Unused',
    'internal.vm.network.device.prefix': 'For LXC\'s lxc.network.veth.pair parameter',
    'internal.vm.network.dhcp-hostsfile': 'File to pass to dnsmasq at its --dhcp-hostsfile parameter',
    'internal.vm.network.firewall.enable': 'Enable firewall rules',
    'internal.hkd.cluster.node.timeout': 'This value should ba adjusted in accordance to internal.database.pool.connection.global_timeout and internal.hkd.agent.ticker.timeout',
    'internal.hkd.agent.ticker.timeout': 'If the ticker agent is not able to tick the database for the following time, it aborts the HKD',
    'l7r.user.umask': 'umask for the L7R process',
    'l7r.use_ssl': 'Whether L7R accepts SSL incoming connections or not',
    'l7r.port': 'Port the L7R should listen to',
    'l7r.address': 'IP addresses L7R should bind to/listen at',
    'l7r.auth.plugins': 'Authentication plugins to use. Comma-separated list of alphanumeric words. Example: "ldap, foo_43,default"',    
    'l7r.loadbalancer.plugin': 'Load balancing plugins to use. Similar to auth plugins',
    'l7r.as_user': 'Actually usused in the code',
    'l7r.pid_file': 'Unused',
    'log.filename': 'Path to the log file',
    'log.level': 'Log verbosity (FATAL, ERROR, WARN, INFO, DEBUG, TRACE or ALL)',
    'osf.default.memory': 'Default memory for newly created OSFs',
    'osf.default.overlay': 'Default overlay for newly created OSFs',
    'path.run': 'Directory where several configuration, state, pid and certificate files are stored',
    'path.log': 'Where QVD logs are stored',
    'path.tmp': 'Temporary files',
    'path.storage.root': 'Main storage location for OS images (both KVM and LXC)',
    'path.storage.staging': 'OS images ready to be used',
    'path.storage.images': 'OS images in use by some VM',
    'path.storage.overlays': 'overlay storage directory for KVM',
    'path.storage.homes': 'homes storage directory for KVM',
    'path.storage.check': 'check storage directory for KVM',
    'path.storage.basefs': 'basefs storage directory for LXC',
    'path.storage.homefs': 'homefs storage directory for LXC',
    'path.storage.btrfs.root': 'btrfs storage directory for LXC',
    'path.l7r.ssl': 'Path for SSL certificates and CAs',
    'path.l7r.ssl.key': 'Path for SSL key',
    'path.l7r.ssl.cert': 'Path for SSL certificates',
    'path.l7r.ssl.ca': 'Path for SSL CAs',
    'path.l7r.ssl.crl': 'Path for SSL CRLs',
    'path.serial.captures': 'KVM serial port captures or LXC console output',
    'vm.hypervisor': 'virtualization engine to use, either kvm or lxc',
    'vm.lxc.unionfs.type': 'COW fs to use with LXC',
    'vm.overlay.persistent': 'Whether to keep overlay images from one session to the next',
    'vm.kvm.virtio': 'Use KVM\'s virtio capabilities',
    'vm.vnc.redirect': 'Specify the VNC availability for KVM\'s VNC support',
    'vm.vnc.opts': 'Specify the VNC options for KVM\'s VNC support',
    'vm.serial.redirect': 'Whether to use KVM\'s serial support or not',
    'vm.serial.capture': 'Capture serial port traffic to a file<br><br>- in KVM it is ignored if serial port is redirected (ie if vm.serial.redirect is set to 1)<br>- in LXC it saves the capture under the directory specified in path.serial.captures',
    'vm.network.bridge': 'All VMs will be attached to this interface, which must be a bridg. The DHCP server uses this setting too',
    'vm.network.domain': 'Default search domain for virtual machines',
    'vm.network.ip.start': 'Start of DHCP range. There\'s no sensible default value',
    'vm.network.ip.netmask': 'QVD private network netmask. There\'s no sensible default value',
    'vm.network.mac.prefix': 'High bytes of the MAC address, the IP is used for the low bytes',
    'vm.kvm.home.drive.index': 'KVM: disk drive will be visible as: 0=hda, 1=hdb, 2=hdc... (parameter \'index\' within -drive in KVM)',
    'vm.lxc.home.per.user': 'When using LXC if this flag is set, QVD will assume that the home directories are not per virtual machine but per user and that they follow the typical NFS home structure.<br><br> Note that in order for this schema to work, the user ids used on the containers and in the directories shouls match. This is usually atained using an that is the same used on the NFS.',
    'vma.audio.enable': 'So that the VMA exports PULSE_SERVER before xinit invocation and passes the \'media=1\' parameter to nxagent',
    'vma.slave.enable': 'Enables "slave channel" in nxagent',
    'vma.slave.command': 'Slave shell to execute to client requests',
    'vma.printing.enable': 'Enables the printing channel in nxagent',
    'vma.pid_file': 'Path to the VMA PID file',
    'vma.user.home.drive': 'Optional: device that contains the homes, as seen from within the VM',
    'vma.user.home.fs': 'When autoprovisioning homes, filesystem type to create in the device',
    'vma.user.home.path': 'Where to mount the homes device',
    'vma.user.default.name': 'Default user name',
    'vma.user.default.groups': 'Default groups user will belong to',
    'vma.default.lan': 'Default language',
    'vma.user.umask': 'umask for the VMA',
    'vma.user.shell': 'Shell for user',
    'vma.on_action.pre-connect': 'External executables the VMA calls when \'pre-connect\' event happens',
    'vma.on_action.connect': 'External executables the VMA calls when \'connect\' event happens',
    'vma.on_action.stop': 'External executables the VMA calls when \'stop\' event happens',
    'vma.on_action.disconnect': 'External executables the VMA calls when \'disconnect\' event happens',
    'vma.on_action.suspend': 'External executables the VMA calls when \'suspend\' event happens',
    'vma.on_action.poweroff': 'External executables the VMA calls when \'poweroff\' event happens',
    'vma.on_action.expire': 'External executables the VMA calls when \'expire\' event happens',
    'vma.on_state.connected': 'External executables the VMA calls just before \'connected\' state is entered',
    'vma.on_state.suspended': 'External executables the VMA calls just before \'suspended\' state is entered',
    'vma.on_state.disconnected': 'External executables the VMA calls just before \'disconnected\' state is entered',
    'vma.on_provisioning.mount_home': 'External executables the VMA call during user provisioning',
    'vma.on_provisioning.add_user': 'External executables the VMA call during user provisioning',
    'vma.on_provisioning.after_add_user': 'External executables the VMA call during user provisioning',
    'vma.default.client.keyboard': 'Unused',
    'vma.default.client.link': 'Unused',
    'wat.admin.login': 'Username of the WAT administrator',
    'wat.admin.password': 'Password of the WAT administrator',
    'wat.log.filename': 'WAT logs go into its own file to avoid permission issues as the process is not run as root',
    'nodename': 'Name of this node in QVD. Usually the machine\'s hostname.',
}


QVD_CONFIG_PREFIX_HELP = {
    'internal': 'Internal parameters, do not change!!!',
}