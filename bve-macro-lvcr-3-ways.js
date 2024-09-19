/**
Please contact @author German Cheung <gecheung@cisco.com> for any questions. Thanks.
*/

import xapi from 'xapi';

const MACRO_VERSION = '1.0.240227';

const LVCR_ROLE_1 = 'lvcr-1';
const LVCR_ROLE_2 = 'lvcr-2';
const LVCR_ROLE_3 = 'lvcr-3';

const LVCR_ROLE_SELF = LVCR_ROLE_1;            // *** #1. need to change according to the LVCR role

const TEST_BTN_COMBINE_ROOM = false;

/**********************************************************************************/
/* Constants, not suppose to change
*/
const LVCR_DESIGN_33 = 'lvcr33';

const LVCR_DESIGN_SELF = LVCR_DESIGN_33;

const MIC_CEILING  = 'mic_ceiling';

const PRESET_1 = '1';
const PRESET_4 = '4';
const PRESET_5 = '5';

const B_MIC_EXCLUSIVE      = true;  // if true, either ceiling or wireless mic
const B_UI_CEILING_SPEAKER = false;
const B_UI_NOISE_REMOVAL   = true;
const B_COMMON_STANDBY     = true;
const B_CAMERA_VIEW_AUTO   = true;

const DEVICE_SETTING_C = {
  'lvcr-1': {
    'gpio_pin'              : [{'dummy': ''}, {'id': 1, 'Mode': 'InputNoAction', 'State': ''}, {'id': 2, 'Mode': 'InputNoAction', 'State': ''}, {'id': 3, 'Mode': 'InputNoAction', 'State': ''}, {'id': 4, 'Mode': '', 'State': ''}],
    'auto_answer'           : {'Mode': 'Off'},
    'camera_speaker_track'  : {'Mode': 'Auto', 'Closeup': 'Auto', 'TrackingMode': 'Auto'},
    'presenter_camera_input': '4',
    'presenter_camera_id'   : '2',

    // lvcr-1: Video
    'video_main_source'         : '1',
    'video_main_source_2'       : '2',
    'video_main_source_3'       : '3',
    'video_monitors'            : 'Dual', // Auto/Single/Dual/DualPresentationOnly/TriplePresentationOnly/Triple
    'video_presentation_source' : '5',
    'video_selfview_default'    : {'Mode': 'Off'},

    // lvcr-1: video_input_connector
    'video_input_connector': [{'id': 'dummy'}, // Visibility=IfSignal/Never
      {'id': 1, 'Name':'Quad Camera', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'camera', 'PreferredResolution': '1920_1080_60', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '1', 'Mode': 'On'}},
      {'id': 2, 'Name':'Camera From Room 2', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'other', 'PreferredResolution': '1920_1080_60', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 3, 'Name':'Camera From Room 3', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'other', 'PreferredResolution': '1920_1080_60', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 4, 'Name':'Presenter Camera', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'camera', 'PreferredResolution': '1920_1080_60', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '2', 'Mode': 'On'}},
      {'id': 5, 'Name':'', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'PC', 'PreferredResolution': '1920_1080_60', 'PresentationSelection': 'OnConnect', 'Quality': 'Sharpness', 'RGBQuantizationRange': '', 'Visibility': 'IfSignal', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 6, 'Name':'', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'camera', 'PreferredResolution': '1920_1080_60', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}}],

    // lvcr-1: video_monitor_preset
    'video_monitor_preset': {
      '1': {'output_connecters': [{'id': 1, 'MonitorRole': 'First'}, {'id': 2, 'MonitorRole': 'Second'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Video on Left Display. Presentation on Right Display.
      '2': {'output_connecters': [{'id': 1, 'MonitorRole': 'Second'}, {'id': 2, 'MonitorRole': 'First'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Presentation on Left Display. Video on Right Display.
      '3': {'output_connecters': [{'id': 1, 'MonitorRole': 'PresentationOnly'}, {'id': 2, 'MonitorRole': 'PresentationOnly'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Presentation Only on all Display.
      '4': {'output_connecters': [{'id': 1, 'MonitorRole': 'First'}, {'id': 2, 'MonitorRole': 'First'}, {'id': 3, 'MonitorRole': 'Recorder'}]} // Video + Presentation on the same Display.
    },

    'video_output_connector_x': {'CEC': 'On', 'Resolution': '', 'HDCPPolicy': 'Off'},

    // lvcr-1: Audio
    'audio_ultrasound_max_volume': 60,
    'audio_default_volume': 50,
    'audio_mic_level_db_max': 70,

    'audio_mic_wireless': [],
    'audio_mic_wireless_combine': [],

    'audio_mic_wireless_lvcr30': [3,4],

    'audio_mic_wireless_combined_1_2': [3,4,6],
    'audio_mic_wireless_combined_1_3': [3,4,8],
    'audio_mic_wireless_combined_1_2_3': [3,4,6,8],

    'audio_mic_x': {'Channel': 'Mono', 'PhantomPower': 'On', 'EchoControl': {'Dereverberation': 'Off', 'Mode': 'On', 'NoiseReduction': 'On'}},

    'audio_input_hdmi': [{'dummy': ''},
      {'id': 1, 'Mode': 'Off'}, {'id': 2, 'Mode': 'Off'}, {'id': 3, 'Mode': 'On'}, {'id': 4, 'Mode': 'On'}, {'id': 5, 'Mode': 'On'}],

    'audio_output_line_x': {'Level': '-4', 'Channel': 'Mono'},

    // lvcr-1: Non-Room mode related control
    'control': {
      'ui_camera_view': 'always', // always | auto | 1 | 2 | disable
      'ui_wireless_mic': 2,
      'use_ceiling_mic': 'always', // never | always | when_combine | when_standalone
      'use_ceiling_speaker': 'always', // never | always | when_combine | when_standalone
      'use_onboard_speaker': 'never', // never | always | when_combine | when_standalone
      'monitor_preset_id': PRESET_1,
      'has_sensor': false,
      'ir_sensor_type': 'ir_sensor_extron', // ir_sensor_omron | ir_sensor_extron
      'camera_1_mic_offset': 0,
      'camera_2_mic_offset': 0,
      'state_camera_position': '',
      'state_combined_room': '',
      'state_gpio_combine': '',
      'state_mute': '',
      'state_mic_ceiling': 'on',
      'state_mic_wireless': 'off',
      'state_xml': '',
      'timeout_dnd': 20160,
    },

    // lvcr-1: Combined behaviour
    'combined_mode': {
      'video_main_source_combined_1_2': [1,2],
      'video_main_source_combined_1_3': [3,1],
      'video_main_source_combined_1_2_3': [3,2,1],

      'disable_ultrasound'  : true,
      'disalbe_wifi_sharing': false,
      'force_noise_removal' : true,
      'force_speaker_track' : true,

      'audio_input_mic': [],
      'audio_output_line': [],

      'audio_input_mic_combined_1_2': [
        {'id': 1, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 2, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 5, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 7, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_3}],

      'audio_input_mic_combined_1_3': [
        {'id': 1, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 2, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 5, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 7, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_3}],

      'audio_input_mic_combined_1_2_3': [
        {'id': 1, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 2, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 5, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 7, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_3}],

      'audio_output_line_combined_1_2': [
        {'id': 1, 'Mode': 'On'},
        {'id': 2, 'Mode': 'On'},
        {'id': 3, 'Mode': 'Off'},
        {'id': 4, 'Mode': 'Off'}],

      'audio_output_line_combined_1_3': [
        {'id': 1, 'Mode': 'On'},
        {'id': 2, 'Mode': 'Off'},
        {'id': 3, 'Mode': 'On'},
        {'id': 4, 'Mode': 'Off'}],

      'audio_output_line_combined_1_2_3': [
        {'id': 1, 'Mode': 'On'},
        {'id': 2, 'Mode': 'On'},
        {'id': 3, 'Mode': 'On'},
        {'id': 4, 'Mode': 'Off'}],

      'audio_output_hdmi': [
        {'id': 1, 'Mode': 'Off'},
        {'id': 2, 'Mode': 'Off'}],

      'video_matrix_assign': [],
    },

    // lvcr-1: Standalone behaviour
    'standalone_mode': {
      'audio_input_mic_use_lvcr23': [
        {'id': 1, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 2, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 3, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 6, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 7, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 8, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2}],

      'audio_input_mic': [
        {'id': 1, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 2, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_1},
        {'id': 5, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 6, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 7, 'Mode': 'Off'},
        {'id': 8, 'Mode': 'Off'}],

      'audio_output_line': [
        {'id': 1, 'Mode': 'On'},
        {'id': 2, 'Mode': 'Off'},
        {'id': 3, 'Mode': 'Off'},
        {'id': 4, 'Mode': 'Off'}],

      'audio_output_hdmi': [
        {'id': 1, 'Mode': 'Off'},
        {'id': 2, 'Mode': 'Off'}],

      'video_matrix_assign': [],
    }
  },
  'lvcr-2': {
    'gpio_pin'              : [{'dummy': ''}, {'id': 1, 'Mode': 'InputNoAction', 'State': ''}, {'id': 2, 'Mode': 'InputNoAction', 'State': ''}, {'id': 3, 'Mode': 'InputNoAction', 'State': ''}, {'id': 4, 'Mode': 'InputNoAction', 'State': ''}],
    'auto_answer'           : {'Mode': 'Off'},
    'camera_speaker_track'  : {'Mode': 'Auto', 'Closeup': 'Auto', 'TrackingMode': 'Auto'},
    'presenter_camera_input': '6',
    'presenter_camera_id'   : '2',

    // lvcr-2: Video
    'video_main_source'         : '1',
    'video_monitors'            : 'Dual', // Auto/Single/Dual/DualPresentationOnly/TriplePresentationOnly/Triple
    'video_presentation_source' : '5',
    'video_selfview_default'    : {'Mode': 'Off'},

    // lvcr-2: video_input_connector
    'video_input_connector': [{'id': 'dummy'},
      {'id': 1, 'Name':'Quad Camera', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'camera', 'PreferredResolution': '1920_1080_60', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '1', 'Mode': 'On'}},
      {'id': 2, 'Name':'LVCR-1 Output 3', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'Other', 'PreferredResolution': '', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 3, 'Name':'LVCR-1 Output 2', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'Other', 'PreferredResolution': '', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 4, 'Name':'LVCR-1 Output 1', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'Other', 'PreferredResolution': '', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 5, 'Name':'', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'PC', 'PreferredResolution': '', 'PresentationSelection': 'OnConnect', 'Quality': 'Sharpness', 'RGBQuantizationRange': '', 'Visibility': 'IfSignal', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 6, 'Name':'Presenter Camera', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'camera', 'PreferredResolution': '', 'PresentationSelection': '', 'Quality': '', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '2', 'Mode': 'On'}}],

    // lvcr-2: video_monitor_preset // Output 3 MonitorRole should always First
    'video_monitor_preset': {
      '1': {'output_connecters': [{'id': 1, 'MonitorRole': 'First'}, {'id': 2, 'MonitorRole': 'Second'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Video on Left Display. Presentation on Right Display.
      '2': {'output_connecters': [{'id': 1, 'MonitorRole': 'Second'}, {'id': 2, 'MonitorRole': 'First'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Presentation on Left Display. Video on Right Display.
      '3': {'output_connecters': [{'id': 1, 'MonitorRole': 'PresentationOnly'}, {'id': 2, 'MonitorRole': 'PresentationOnly'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Presentation Only on all Display.
      '4': {'output_connecters': [{'id': 1, 'MonitorRole': 'First'}, {'id': 2, 'MonitorRole': 'First'}, {'id': 3, 'MonitorRole': 'Recorder'}]} // Video + Presentation on the same Display.
    },

    'video_monitor_preset_monitors_single': {
      '1': {'output_connecters': [{'id': 1, 'MonitorRole': 'Auto'}, {'id': 2, 'MonitorRole': 'Auto'}, {'id': 3, 'MonitorRole': 'First'}]}
    },

    'video_output_connector_x': {'CEC': 'On', 'Resolution': '', 'HDCPPolicy': 'Off'},

    'video_output_connector_monitors_single': [{'id': 'dummy'},
      {'id': 1, 'MonitorRole': 'First', 'OverscanLevel': '', 'Resolution': 'Auto'}, // MonitorRole=Auto/First/Second/Third/PresentationOnly/Recorder
      {'id': 2, 'MonitorRole': 'Auto', 'OverscanLevel': '', 'Resolution': 'Auto'},
      {'id': 3, 'MonitorRole': 'Recorder', 'OverscanLevel': '', 'Resolution': 'Auto'}],

    // lvcr-2: Audio
    'audio_ultrasound_max_volume': 60,
    'audio_default_volume': 50,
    'audio_mic_level_db_max': 70,

    'audio_mic_wireless': [],
    'audio_mic_wireless_lvcr30': [3,4],

    'audio_input_hdmi': [{'dummy': ''},
      {'id': 1, 'Mode': 'Off'}, {'id': 2, 'Mode': 'Off'}, {'id': 3, 'Mode': 'Off'}, {'id': 4, 'Mode': 'Off'}, {'id': 5, 'Mode': 'On'}],

    // lvcr-2: Non-Room mode related control
    'control': {
      'ui_wireless_mic': 2,
      'use_ceiling_mic': 'always', // never | always | when_combine | when_standalone
      'use_ceiling_speaker': 'always', // never | always | when_combine | when_standalone
      'use_onboard_speaker': 'never', // never | always | when_combine | when_standalone
      'monitor_preset_id': PRESET_1,
      'has_sensor': false,
      'state_camera_position': '',
      'state_combined_room': '',
      'state_mute': '',
      'state_gpio_combine': '',
      'state_mic_ceiling': 'on',
      'state_mic_wireless': 'off',
      'state_xml': '',
      'timeout_dnd': 20160,
    },

    // lvcr-2: Combined behaviour
    'combined_mode': {
      'disable_ultrasound'  : true,
      'disalbe_wifi_sharing': true,
      'force_noise_removal' : true,
      'force_speaker_track' : true,

      'audio_input_mic': [
        {'id': 1, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 2, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2}],

      'audio_output_line': [
        {'id': 1, 'Mode': 'Off'}],

      'audio_output_hdmi': [
        {'id': 1, 'Mode': 'Off'},
        {'id': 2, 'Mode': 'Off'}],

      'video_matrix_assign': [
        {'Output': 1, 'SourceID': 4},
        {'Output': 2, 'SourceID': 3},
        {'Output': 3, 'SourceID': 2}],
    },

    // lvcr-2: Standalone behaviour
    'standalone_mode': {
      'audio_input_mic': [
        {'id': 1, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2},
        {'id': 2, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_2}],

      'audio_output_line': [
        {'id': 1, 'Mode': 'On'}],

      'audio_output_hdmi': [
        {'id': 1, 'Mode': 'Off'},
        {'id': 2, 'Mode': 'Off'}],

      'video_matrix_assign': [],
    }
  },
  'lvcr-3': {
    'gpio_pin'              : [{'dummy': ''}, {'id': 1, 'Mode': 'InputNoAction', 'State': ''}, {'id': 2, 'Mode': 'InputNoAction', 'State': ''}, {'id': 3, 'Mode': 'InputNoAction', 'State': ''}, {'id': 4, 'Mode': 'InputNoAction', 'State': ''}],
    'auto_answer'           : {'Mode': 'Off'},
    'camera_speaker_track'  : {'Mode': 'Auto', 'Closeup': 'Auto', 'TrackingMode': 'Auto'},
    'presenter_camera_input': '6',
    'presenter_camera_id'   : '2',

    // lvcr-3: Video
    'video_main_source'         : '1',
    'video_monitors'            : 'Dual', // Auto/Single/Dual/DualPresentationOnly/TriplePresentationOnly/Triple
    'video_presentation_source' : '5',
    'video_selfview_default'    : {'Mode': 'Off'},

    // lvcr-3: video_input_connector
    'video_input_connector': [{'id': 'dummy'},
      {'id': 1, 'Name':'Quad Camera', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'camera', 'PreferredResolution': '1920_1080_60', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '1', 'Mode': 'On'}},
      {'id': 2, 'Name':'LVCR-1 Output 3', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'Other', 'PreferredResolution': '', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 3, 'Name':'LVCR-1 Output 2', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'Other', 'PreferredResolution': '', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 4, 'Name':'LVCR-1 Output 1', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'Other', 'PreferredResolution': '', 'PresentationSelection': 'Manual', 'Quality': 'Motion', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 5, 'Name':'', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'PC', 'PreferredResolution': '', 'PresentationSelection': 'OnConnect', 'Quality': 'Sharpness', 'RGBQuantizationRange': '', 'Visibility': 'IfSignal', 'CameraControl': {'CameraId': '', 'Mode': 'Off'}},
      {'id': 6, 'Name':'Presenter Camera', 'CEC_Mode': 'On', 'HDCP_Mode': 'Off', 'InputSourceType': 'camera', 'PreferredResolution': '', 'PresentationSelection': '', 'Quality': '', 'RGBQuantizationRange': '', 'Visibility': 'Never', 'CameraControl': {'CameraId': '2', 'Mode': 'On'}}],

    // lvcr-3: video_monitor_preset // Output 3 MonitorRole should always First
    'video_monitor_preset': {
      '1': {'output_connecters': [{'id': 1, 'MonitorRole': 'First'}, {'id': 2, 'MonitorRole': 'Second'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Video on Left Display. Presentation on Right Display.
      '2': {'output_connecters': [{'id': 1, 'MonitorRole': 'Second'}, {'id': 2, 'MonitorRole': 'First'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Presentation on Left Display. Video on Right Display.
      '3': {'output_connecters': [{'id': 1, 'MonitorRole': 'PresentationOnly'}, {'id': 2, 'MonitorRole': 'PresentationOnly'}, {'id': 3, 'MonitorRole': 'Recorder'}]}, // Presentation Only on all Display.
      '4': {'output_connecters': [{'id': 1, 'MonitorRole': 'First'}, {'id': 2, 'MonitorRole': 'First'}, {'id': 3, 'MonitorRole': 'Recorder'}]} // Video + Presentation on the same Display.
    },

    'video_monitor_preset_monitors_single': {
      '1': {'output_connecters': [{'id': 1, 'MonitorRole': 'Auto'}, {'id': 2, 'MonitorRole': 'Auto'}, {'id': 3, 'MonitorRole': 'First'}]}
    },

    'video_output_connector_x': {'CEC': 'On', 'Resolution': 'Auto', 'HDCPPolicy': 'Off'},

    'video_output_connector_monitors_single': [{'id': 'dummy'},
      {'id': 1, 'MonitorRole': 'First', 'OverscanLevel': '', 'Resolution': 'Auto'}, // MonitorRole=Auto/First/Second/Third/PresentationOnly/Recorder
      {'id': 2, 'MonitorRole': 'Auto', 'OverscanLevel': '', 'Resolution': 'Auto'},
      {'id': 3, 'MonitorRole': 'Recorder', 'OverscanLevel': '', 'Resolution': 'Auto'}],

    // lvcr-3: Audio
    'audio_ultrasound_max_volume': 60,
    'audio_default_volume': 50,
    'audio_mic_level_db_max': 70,

    'audio_mic_wireless': [],
    'audio_mic_wireless_lvcr30': [3,4],

    'audio_input_hdmi': [{'dummy': ''},
      {'id': 1, 'Mode': 'Off'}, {'id': 2, 'Mode': 'Off'}, {'id': 3, 'Mode': 'Off'}, {'id': 4, 'Mode': 'Off'}, {'id': 5, 'Mode': 'On'}],

    // lvcr-3: Non-Room mode related control
    'control': {
      'ui_wireless_mic': 2,
      'use_ceiling_mic': 'always', // never | always | when_combine | when_standalone
      'use_ceiling_speaker': 'always', // never | always | when_combine | when_standalone
      'use_onboard_speaker': 'never', // never | always | when_combine | when_standalone
      'monitor_preset_id': PRESET_1,
      'has_sensor': false,
      'state_camera_position': '',
      'state_combined_room': '',
      'state_mute': '',
      'state_gpio_combine': '',
      'state_mic_ceiling': 'on',
      'state_mic_wireless': 'off',
      'state_xml': '',
      'timeout_dnd': 20160,
    },

    // lvcr-3: Combined behaviour
    'combined_mode': {
      'disable_ultrasound'  : true,
      'disalbe_wifi_sharing': true,
      'force_noise_removal' : true,
      'force_speaker_track' : true,

      'audio_input_mic': [
        {'id': 1, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_3},
        {'id': 2, 'Mode': 'Off', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_3}],

      'audio_output_line': [
        {'id': 1, 'Mode': 'Off'}],

      'audio_output_hdmi': [
        {'id': 1, 'Mode': 'Off'},
        {'id': 2, 'Mode': 'Off'}],

      'video_matrix_assign': [
        {'Output': 1, 'SourceID': 4},
        {'Output': 2, 'SourceID': 3},
        {'Output': 3, 'SourceID': 2}],
    },

    // lvcr-3: Standalone behaviour
    'standalone_mode': {
      'audio_input_mic': [
        {'id': 1, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_3},
        {'id': 2, 'Mode': 'On', 'Type': MIC_CEILING, 'LocateAt': LVCR_ROLE_3}],

      'audio_output_line': [
        {'id': 1, 'Mode': 'On'}],

      'audio_output_hdmi': [
        {'id': 1, 'Mode': 'Off'},
        {'id': 2, 'Mode': 'Off'}],

      'video_matrix_assign': [],
    }
  }
}

/* Constants, not suppose to change
*/
const PANEL_ID             = 'panel-bve_lvcr_control';
const PANEL_BTN_NAME       = 'Room Control';
const PANEL_BTN_ICON       = 'Input';
const REMOVE_PANEL         = ['panel-bve_proximity_control'];

const TIMER_RETRY_RESET    = 30*60*1000;
const TIMER_MIC_ALERT      = 8; // sec

const MSG_MIC_WIRELESS = {Text: 'Wireless Mic is in use', Duration: TIMER_MIC_ALERT};
const MSG_MIC_CEILING  = {Text: 'Ceiling Mic is in use', Duration: TIMER_MIC_ALERT};
const MSG_SIGNIN_BANNER = 'This is LVCR device. Do not make any unauthorized changes!';

const IR_SENSOR_TYPE_EXTRON = 'ir_sensor_extron';
const IR_SENSOR_TYPE_OMRON = 'ir_sensor_omron';

const GPIO_IR_SENSOR_EXTRON = {'id': 1, 'State': {'combine': 'High', 'standalone': 'Low'}};
const GPIO_IR_SENSOR_OMRON = {'id': 1, 'State': {'combine': 'Low', 'standalone': 'High'}};
const GPIO_IR_SENSOR = (DEVICE_SETTING_C[LVCR_ROLE_1].control.ir_sensor_type == IR_SENSOR_TYPE_OMRON)? GPIO_IR_SENSOR_OMRON : GPIO_IR_SENSOR_EXTRON;
const GPIO_IR_SENSOR_TYPE = (DEVICE_SETTING_C[LVCR_ROLE_1].control.ir_sensor_type == IR_SENSOR_TYPE_OMRON)? IR_SENSOR_TYPE_OMRON : IR_SENSOR_TYPE_EXTRON;
const GPIO_STANDBY = {'id': 4, 'State': {'deactivate': 'High', 'activate': 'Low'}};

const GPIO_VALUE_PIN_1 = 0x1000;
const GPIO_VALUE_PIN_2 = 0x0100;
const GPIO_VALUE_PIN_3 = 0x0010;
const GPIO_VALUE_PIN_4 = 0x0001;

const AUDIO_OUTPUT_HDMI_2 = ['Codec Pro', 'Room 70D G2'];
const CAMERA_PRESET_MAX   = 8;

const MONITOR_DUAL = 'Dual';
const MONITOR_SINGLE = 'Single';

const USE_NEVER = 'never';
const USE_ALWAYS = 'always';
const USE_WHEN_COMBINE = 'when_combine';
const USE_WHEN_STANDALONE = 'when_standalone';

const STATE_COMBINED_ROOM_1       = 'state_combined_room_1';
const STATE_COMBINED_ROOM_1_2     = 'state_combined_room_1_2';
const STATE_COMBINED_ROOM_1_2_3   = 'state_combined_room_1_2_3';
const STATE_COMBINED_ROOM_1_2_4   = 'state_combined_room_1_2_4';
const STATE_COMBINED_ROOM_1_2_3_4 = 'state_combined_room_1_2_3_4';
const STATE_COMBINED_ROOM_1_3     = 'state_combined_room_1_3';
const STATE_COMBINED_ROOM_2_4     = 'state_combined_room_2_4';

const MAP_STATE_COMBINE_NAME = {
  'state_combined_room_1_2'    : '1 + 2',
  'state_combined_room_1_2_3'  : '1 + 2 + 3',
  'state_combined_room_1_2_4'  : '1 + 2 + 4',
  'state_combined_room_1_2_3_4': '1 + 2 + 3 + 4',
  'state_combined_room_1_3'    : '1 + 3',
  'state_combined_room_2_4'    : '2 + 4'
}

const SHOW_PAGE_AUDIO     = true;
const SHOW_PAGE_CAMERA    = true;
const SHOW_PAGE_DISPLAY   = true;
const SHOW_PAGE_ADVANCED  = false;

const widgetIds = {
  'page_room_control'       : 'page-room_control',

  'monitor_preset':    'group-monitor_preset',
  'monitor_role_1':    'group-monitor_role_1',
  'monitor_role_2':    'group-monitor_role_2',
  'monitor_role_3':    'group-monitor_role_3',
  'monitor_role_save': 'button-monitor_role_save',
  'page_monitor_role_preset':   'page-monitor_role_preset',
  'page_monitor_role_advanced': 'page-monitor_role_advanced',
  'vc_reset_1':        'text-vc_reset_1',

  'status_combine'          : 'text-status_combine',
  'combine_room'            : 'button-combine_room',

  'mic_1_mode':  'toggle-mic_1_mode',   'mic_2_mode':  'toggle-mic_2_mode',
  'mic_3_mode':  'toggle-mic_3_mode',   'mic_4_mode':  'toggle-mic_4_mode',
  'mic_5_mode':  'toggle-mic_5_mode',   'mic_6_mode':  'toggle-mic_6_mode',
  'mic_7_mode':  'toggle-mic_7_mode',   'mic_8_mode':  'toggle-mic_8_mode',
  'mic_1_level': 'spinner-mic_1_level', 'mic_2_level': 'spinner-mic_2_level',
  'mic_3_level': 'spinner-mic_3_level', 'mic_4_level': 'spinner-mic_4_level',
  'mic_5_level': 'spinner-mic_5_level', 'mic_6_level': 'spinner-mic_6_level',
  'mic_7_level': 'spinner-mic_7_level', 'mic_8_level': 'spinner-mic_8_level',

  'noise_removal':         'toggle-noise_removal',
  'speaker_ceiling_mode':  'toggle-speaker_ceiling_mode',
  'speaker_ceiling_level': 'spinner-speaker_ceiling_level',

  'camera_preset':     'group-camera_preset',
  'camera_selfview':   'toggle-camera_selfview',
  'camera_track':      'group-camera_track',
  'camera_view':       'button-camera_view',
  'last_camera_preset': 'text-last_camera_preset',
}

const cameras = {
  'presenter_track'       : {
    'name'                : 'PresenterTrack',
    'enable'              : 'True',
    'connector'           : DEVICE_SETTING_C[LVCR_ROLE_SELF].presenter_camera_input,
  },
  'speaker_track'         : {'name': 'Front', 'mode': 'Auto', 'closeup': 'Auto', 'connector': 1},
}

let device_setting = JSON.parse(JSON.stringify(DEVICE_SETTING_C));

let timer_reset_default = 0;

/* Common
*/
async function common_initConfig() {
  const setting = device_setting[LVCR_ROLE_SELF];
  handleLog('common_initConfig', `lvcr_design=${LVCR_DESIGN_SELF}, lvcr_role=${LVCR_ROLE_SELF}, sensor=${GPIO_IR_SENSOR_TYPE}`);
  const audio = await xapi.config.get('Audio').catch(e => {return ''});
  const video = await xapi.config.get('Video').catch(e => {return ''});
  const camera = await xapi.config.get('Cameras').catch(e => {return ''});
  const conference = await xapi.config.get('Conference').catch(e => {return ''});
  const system_unit = await xapi.status.get('SystemUnit').catch(e => {return ''});

  handleDebug('common_initConfig', `audio`, audio);
  handleDebug('common_initConfig', `video`, video);
  handleDebug('common_initConfig', `camera`, camera);
  handleDebug('common_initConfig', `conference`, conference);
  handleDebug('common_initConfig', `system_unit`, system_unit);

  if(!audio || !video || !camera || !conference || !system_unit) {
    handleError('common_initConfig', `lvcr_design=${LVCR_DESIGN_SELF}, lvcr_role=${LVCR_ROLE_SELF}`);
    return;
  }

  const setting_x = device_setting[LVCR_ROLE_1];

  // GPIO
  for(const val of setting.gpio_pin) {
    if(!!val.id) {
      if(setting.gpio_pin[val.id].Mode)  await setGpioMode(val.id, setting.gpio_pin[val.id].Mode);

      if(setting.gpio_pin[val.id].Mode == 'OutputManualState')
        await setGpioState(val.id, setting.gpio_pin[val.id].State);
    }
  }

  if(!!system_unit.ProductPlatform && AUDIO_OUTPUT_HDMI_2.indexOf(system_unit.ProductPlatform) === -1) {
    setting.combined_mode.audio_output_hdmi[1].Mode = '';
    setting.standalone_mode.audio_output_hdmi[1].Mode = '';
  }

  // Audio Wireless Mic
  if(setting.control.ui_wireless_mic) {
    setting.audio_mic_wireless = setting.audio_mic_wireless_lvcr30;
  }

  // Audio Input
  if(!!audio.Input && audio.Input.ARC)
    for(const val of audio.Input.ARC) {
      if(!!val.id && val.Mode)  await xconfig(`Audio Input ARC ${val.id} Mode`, 'Off');
    }

  if(!!audio.Input && audio.Input.HDMI)
    for(const val of audio.Input.HDMI) {
      let setting_id = setting.audio_input_hdmi[val.id];
      if(!!val.id && val.Mode)  await xconfig(`Audio Input HDMI ${val.id} Mode`, setting_id.Mode);
    }

  for(const val of audio.Input.Microphone)
    if(!!val.id) {
      if(!!val.Channel && !!setting_x.audio_mic_x.Channel)  await xconfig(`Audio Input Microphone ${val.id} Channel`, setting_x.audio_mic_x.Channel);
      if(!!val.PhantomPower && !!setting_x.audio_mic_x.PhantomPower)  await xconfig(`Audio Input Microphone ${val.id} PhantomPower`, setting_x.audio_mic_x.PhantomPower);

      if(!!val.EchoControl) {
        if(!!val.EchoControl.Dereverberation && !!setting_x.audio_mic_x.EchoControl.Dereverberation)  await xconfig(`Audio Input Microphone ${val.id} EchoControl Dereverberation`, setting_x.audio_mic_x.EchoControl.Dereverberation);
        if(!!val.EchoControl.Mode && !!setting_x.audio_mic_x.EchoControl.Mode)  await xconfig(`Audio Input Microphone ${val.id} EchoControl Mode`, setting_x.audio_mic_x.EchoControl.Mode);
        if(!!val.EchoControl.NoiseReduction && !!setting_x.audio_mic_x.EchoControl.NoiseReduction)  await xconfig(`Audio Input Microphone ${val.id} EchoControl NoiseReduction`, setting_x.audio_mic_x.EchoControl.NoiseReduction);
      }
    }

  const setting_mic = (LVCR_ROLE_SELF == LVCR_ROLE_1) ? setting.combined_mode.audio_input_mic : setting.standalone_mode.audio_input_mic;
  const mic_1_level = audio.Input.Microphone[0].Level;
  for(const val of setting_mic)
    if(!!val.id && val.id != 1 && val.Type == MIC_CEILING)   await xconfig(`Audio Input Microphone ${val.id} Level`, mic_1_level);

  // Audio Output
  if(!!audio.Output && audio.Output.ARC)
    for(const val of audio.Output.ARC)
      if(!!val.id && val.id == '1')  await xconfig(`Audio Output ARC ${val.id} Mode`, 'On');

  for(const val of audio.Output.Line)
    if(!!val.id) {
      if(!!val.Channel && !!setting_x.audio_output_line_x.Channel)  await xconfig(`Audio Output Line ${val.id} Channel`, setting_x.audio_output_line_x.Channel);
      if(!!val.Level && !!setting_x.audio_output_line_x.Level)  await xconfig(`Audio Output Line ${val.id} Level`, setting_x.audio_output_line_x.Level);
    }

  // Audio Misc
  await xconfig('Audio DefaultVolume', setting.audio_default_volume);
  await xcommand('Audio Volume Set', {Level: setting.audio_default_volume});

  // Video Input
//  await xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source});

  if(!!video.Input && video.Input.Connector)
    for(const val of video.Input.Connector) {
      let setting_id = setting.video_input_connector[val.id];
      if(!!val.id) {
        await xconfig(`Video Input Connector ${val.id} Name`, setting_id.Name);

        if(!!val.InputSourceType && !!setting_id.InputSourceType)             await xconfig(`Video Input Connector ${val.id} InputSourceType`, setting_id.InputSourceType);
        if(!!val.PreferredResolution && !!setting_id.PreferredResolution)     await xconfig(`Video Input Connector ${val.id} PreferredResolution`, setting_id.PreferredResolution);
        if(!!val.PresentationSelection && !!setting_id.PresentationSelection) await xconfig(`Video Input Connector ${val.id} PresentationSelection`, setting_id.PresentationSelection);
        if(!!val.Quality && !!setting_id.Quality)                             await xconfig(`Video Input Connector ${val.id} Quality`, setting_id.Quality);
        if(!!val.RGBQuantizationRange && !!setting_id.RGBQuantizationRange)   await xconfig(`Video Input Connector ${val.id} RGBQuantizationRange`, setting_id.RGBQuantizationRange);
        if(!!val.Visibility && !!setting_id.Visibility)                       await xconfig(`Video Input Connector ${val.id} Visibility`, setting_id.Visibility);
        if(!!val.CEC && val.CEC.Mode && !!setting_id.CEC_Mode)                await xconfig(`Video Input Connector ${val.id} CEC Mode`, setting_id.CEC_Mode);
        if(!!val.HDCP && val.HDCP.Mode && !!setting_id.HDCP_Mode)             await xconfig(`Video Input Connector ${val.id} HDCP Mode`, setting_id.HDCP_Mode);
        if(!!val.CameraControl) {
          if(val.id != 5 || setting.control.has_sensor) {
            if(!!val.CameraControl.CameraId && !!setting_id.CameraControl.CameraId) await xconfig(`Video Input Connector ${val.id} CameraControl CameraId`, setting_id.CameraControl.CameraId);
            if(!!val.CameraControl.Mode && !!setting_id.CameraControl.Mode)         await xconfig(`Video Input Connector ${val.id} CameraControl Mode`, setting_id.CameraControl.Mode);
          }
        }
      }
    }

  // Video Output
  if(LVCR_ROLE_SELF == LVCR_ROLE_2 && MONITOR_SINGLE == setting.video_monitors)
    setting.video_monitor_preset = setting.video_monitor_preset_monitors_single;

  if(!!video.Output && video.Output.Connector) {
    const video_monitor_preset = setting.video_monitor_preset[setting.control.monitor_preset_id].output_connecters;
    handleLog('common_initConfig', `monitor_preset_id=${setting.control.monitor_preset_id}`, video_monitor_preset);
    for(const val of video.Output.Connector) {
      if(val.CEC && !!setting.video_output_connector_x.CEC)    await xconfig(`Video Output Connector ${val.id} CEC Mode`, setting.video_output_connector_x.CEC);
      if(val.Resolution && !!setting.video_output_connector_x.Resolution)    await xconfig(`Video Output Connector ${val.id} Resolution`, setting.video_output_connector_x.Resolution);
      if(val.HDCPPolicy && !!setting.video_output_connector_x.HDCPPolicy)    await xconfig(`Video Output Connector ${val.id} HDCPPolicy`, setting.video_output_connector_x.HDCPPolicy);
      if(val.MonitorRole)   await xconfig(`Video Output Connector ${val.id} MonitorRole`, video_monitor_preset[val.id-1].MonitorRole);
    }
  }

  // Video Misc
  await xconfig('Video DefaultMainSource', setting.video_main_source);
  await xconfig('Video Monitors', setting.video_monitors);
  await xconfig('Video Presentation DefaultSource', setting.video_presentation_source);
  await xconfig('Video Selfview Default Mode', setting.video_selfview_default.Mode);

  // Camera
  if(!!camera.SpeakerTrack) {
    if(camera.SpeakerTrack.Mode && !!setting.camera_speaker_track.Mode)                 await xconfig(`Cameras SpeakerTrack Mode`, setting.camera_speaker_track.Mode);
    if(camera.SpeakerTrack.Closeup && !!setting.camera_speaker_track.Closeup)           await xconfig(`Cameras SpeakerTrack Closeup`, setting.camera_speaker_track.Closeup);
    if(camera.SpeakerTrack.TrackingMode && !!setting.camera_speaker_track.TrackingMode) await xconfig(`Cameras SpeakerTrack TrackingMode`, setting.camera_speaker_track.TrackingMode);
  }

  // Misc
  if(!!conference.AutoAnswer && !!conference.AutoAnswer.Mode)   await xconfig(`Conference AutoAnswer Mode`, setting.auto_answer.Mode);
}

async function common_setMode(common_setting) {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_mic_wireless = setting.control.state_mic_wireless;
  handleLog('common_setMode', `state_mic_wireless=${state_mic_wireless}`);
  handleDebug('common_setMode', `audio_mic_wireless=${setting.audio_mic_wireless}`);

  // Audio Input Microphone
  if(state_mic_wireless == C.ON) {
    for(let id=1; id<=8; id++)
      if(!setting.audio_mic_wireless.includes(id))  await xconfig(`Audio Input Microphone ${id} Mode`, 'Off');
  }
  else {
    for(const id of setting.audio_mic_wireless)
      if(!!id)      await xconfig(`Audio Input Microphone ${id} Mode`, 'Off');

    for(const val of common_setting.audio_input_mic)
      if(!!val.id)  await xconfig(`Audio Input Microphone ${val.id} Mode`, val.Mode);
  }

  // Audio Output HDMI
  for(const val of common_setting.audio_output_hdmi)
    if(!!val.id && !!val.Mode)  await xconfig(`Audio Output HDMI ${val.id} Mode`, val.Mode);

  // Audio Output Line
  for(const val of common_setting.audio_output_line)
    if(!!val.id && !!val.Mode)    await xconfig(`Audio Output Line ${val.id} Mode`, val.Mode);

  // Video Matrix
  if(common_setting.video_matrix_assign.length) {
    for(const val of common_setting.video_matrix_assign)
      if(!!val.Output && !!val.SourceID)  await xcommand('Video Matrix Assign', {Output: val.Output, SourceID: val.SourceID});
  }
  else
    await xcommand('Video Matrix Reset');
}

async function common_enableUI() {
  handleLog('common_enableUI');
  await xcommand('UserInterface Message Prompt Clear');
}

async function common_disableUI(event) {
  handleLog('common_disableUI', `event`, event);
  await xcommand('UserInterface Extensions Panel Close');

  if(event.FeedbackId == 'ui_disabled') {
    await xcommand('UserInterface Message Prompt Display', {
      Title: 'Room Combined',
      Text: 'Please use the panel in the main room.',
      FeedbackId: 'ui_disabled'
    });
  }
}

async function common_setCombinedMode() {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('common_setCombinedMode', `lvcr_role=${LVCR_ROLE_SELF}, state_combined_room=${state_combined_room}`);
  const audio_mic = await xapi.config.get(`Audio Microphones`).catch(e => {return ''});
  const camera = await xapi.config.get('Cameras').catch(e => {return ''});
  handleDebug('common_setCombinedMode', `audio_mic`, audio_mic);
  handleDebug('common_setCombinedMode', `camera`, camera);

  if(!audio_mic || !camera) {
    handleError('common_setCombinedMode');
    return;
  }

  await xcommand('Call Disconnect');
  await xcommand('Presentation Stop');

  await common_setMode(setting.combined_mode);

  if(setting.combined_mode.disable_ultrasound)    await xconfig('Audio Ultrasound MaxVolume', '0');
  if(setting.combined_mode.disalbe_wifi_sharing) {
    await xconfig('Video Input AirPlay Mode', 'Off');
    await xconfig('Video Input Miracast Mode', 'Off');

//    await xcommand('AirPlay ResetPairedDevices');
//    await xcommand('Proximity Services Deactivate');
  }

  await xconfig('Standby Control', 'Off');
//  await xconfig('UserInterface OSD Mode', 'Unobstructed');
  await xconfig('UserInterface Assistant Mode', 'Off');

  if(!!audio_mic.NoiseRemoval && setting.combined_mode.force_noise_removal)   await xcommand('Audio Microphones NoiseRemoval Activate');
  if(!!camera.SpeakerTrack && setting.combined_mode.force_speaker_track)      await xcommand('Cameras SpeakerTrack Activate');

  await xcommand('Conference DoNotDisturb Activate', {Timeout: setting.control.timeout_dnd});
  await xcommand('Audio Microphones Unmute');

  await common_disableUI({FeedbackId: 'ui_disabled'});
  await common_cbStandby();

  const xml = await rebuildUI();
  if(xml != setting.control.state_xml)  await restoreExtension(xml);
  setting.control.state_xml = xml;
  await updateUI();
}

async function common_setStandaloneMode() {
  handleLog('common_setStandaloneMode');
  const setting = device_setting[LVCR_ROLE_SELF];

  await common_setMode(setting.standalone_mode);

  await xconfig('Audio Ultrasound MaxVolume', setting.audio_ultrasound_max_volume);
  await xconfig('Standby Control', 'On');
  await xconfig('UserInterface OSD Mode', 'Auto');
  await xconfig('UserInterface Assistant Mode', 'On');
  await xconfig('Video Input AirPlay Mode', 'On');
  await xconfig('Video Input Miracast Mode', 'On');

  await xcommand('Conference DoNotDisturb Deactivate');
//  await xcommand('Proximity Services Activate');
  await xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source});

  await common_enableUI();

  const xml = await rebuildUI();
  if(xml != setting.control.state_xml)  await restoreExtension(xml);
  setting.control.state_xml = xml;
  await updateUI();
}

async function common_cbCallDisconnected(event) {
  handleLog('common_cbCallDisconnected', event);
  await xcommand('Audio Microphones NoiseRemoval Activate');
  await setMicMode(1, C.ON);
  await VideoOutputReset('common_cbCallDisconnected', PRESET_1, true);
}

async function common_cbSensorState(event='') {
  const gpio_pins = await xapi.status.get('GPIO Pin').catch(e => {return ''});
  handleDebug('common_cbSensorState', `event`, event, `gpio_pins`, gpio_pins);

  if(!gpio_pins) {
    handleError('common_cbSensorState');
    return;
  }

  const setting = device_setting[LVCR_ROLE_SELF];
  const sensor_combined = GPIO_IR_SENSOR.State.combine;

  if(TEST_BTN_COMBINE_ROOM && setting.control.state_xml)   unsetWidgetValue(widgetIds.combine_room);

  let state_gpio_combine = 0;
  for(const val of gpio_pins) {
    if(val.id == '1' && val.State == sensor_combined)       state_gpio_combine += GPIO_VALUE_PIN_1;
    else if((LVCR_ROLE_SELF == LVCR_ROLE_1) && val.id == '2' && val.State == sensor_combined)  state_gpio_combine += GPIO_VALUE_PIN_2;
  }
  setting.control.state_gpio_combine = state_gpio_combine;

  let state_combined_room = '';
  if(LVCR_ROLE_SELF == LVCR_ROLE_1) {
    if(state_gpio_combine & GPIO_VALUE_PIN_1 && state_gpio_combine & GPIO_VALUE_PIN_2) state_combined_room = STATE_COMBINED_ROOM_1_2_3;
    else if(state_gpio_combine & GPIO_VALUE_PIN_1) state_combined_room = STATE_COMBINED_ROOM_1_2;
    else if(state_gpio_combine & GPIO_VALUE_PIN_2) state_combined_room = STATE_COMBINED_ROOM_1_3;

    setting.control.state_combined_room = state_combined_room;
    handleLog('common_cbSensorState', `lvcr_role=${LVCR_ROLE_SELF}, state_gpio_combine=0x${state_gpio_combine.toString(16).padStart(4, "0")}, state_combined_room=${state_combined_room}`);

    if(state_combined_room) await lvcr1_setCombinedMode();
    else await lvcr1_setStandaloneMode();
  }
  else if(LVCR_ROLE_SELF == LVCR_ROLE_2) {
    if(state_gpio_combine & GPIO_VALUE_PIN_1) state_combined_room = STATE_COMBINED_ROOM_1_2;

    setting.control.state_combined_room = state_combined_room;
    handleLog('common_cbSensorState', `lvcr_role=${LVCR_ROLE_SELF}, state_gpio_combine=0x${state_gpio_combine.toString(16).padStart(4, "0")}, state_combined_room=${state_combined_room}`);

    if(state_combined_room) await common_setCombinedMode();
    else await common_setStandaloneMode();
  }
  else if(LVCR_ROLE_SELF == LVCR_ROLE_3) {
    if(state_gpio_combine & GPIO_VALUE_PIN_1) state_combined_room = STATE_COMBINED_ROOM_1_3;

    setting.control.state_combined_room = state_combined_room;
    handleLog('common_cbSensorState', `lvcr_role=${LVCR_ROLE_SELF}, state_gpio_combine=0x${state_gpio_combine.toString(16).padStart(4, "0")}, state_combined_room=${state_combined_room}`);

    if(state_combined_room) await common_setCombinedMode();
    else await common_setStandaloneMode();
  }
}

async function common_cbStandby(event='') {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('common_cbStandby', `state_combined_room=${state_combined_room}`, event);

  if(B_COMMON_STANDBY && LVCR_ROLE_SELF != LVCR_ROLE_1 && state_combined_room && state_combined_room.includes('_1_')) {
    const state_gpio = await xapi.status.get(`GPIO Pin ${GPIO_STANDBY.id} State`).catch(e => {return ''});
    const state_standby = await xapi.status.get(`Standby State`).catch(e => {return ''});
    handleLog('common_cbStandby', `state_gpio=${state_gpio}, state_standby=${state_standby}`);
    if(state_gpio && state_gpio == GPIO_STANDBY.State.activate && state_standby && state_standby != C.STANDBY_STANDBY)
      await xcommand('Standby Activate');
    if(state_gpio && state_gpio == GPIO_STANDBY.State.deactivate && state_standby && state_standby != C.STANDBY_OFF)
      await xcommand('Standby Deactivate');
  }
}

function is_commonS() {
  if(!LVCR_ROLE_SELF || LVCR_ROLE_SELF == LVCR_ROLE_1) return false;
  else return true;
}

let mic_meters = {};
let camera_score = {'camera_1': 0, 'camera_2': 0, 'camera_3': 0, 'camera_tie': 0};
let camera_active_view = 0;
let b_init_vumeter = false;
const AUDIO_VU_METER = {ConnectorType: 'Microphone', IntervalMs: 500, Source: 'AfterAEC', BufferSize: 3};
const THRESHOLD_CAMERA_SWITCH = 3;
const THRESHOLD_MIC_VU = 20;
const TIMER_VU_CHECK = AUDIO_VU_METER.IntervalMs * AUDIO_VU_METER.BufferSize;

async function cbVuMeter(event) {
//  handleLog('cbVuMeter', event);
  if(event.id && event.VuMeter) {
    try {
      mic_meters[event.id].VuMeter.shift();
      mic_meters[event.id].VuMeter.push(event.VuMeter);
    }
    catch(err) {}
  }
}

async function initVuMeter() {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('initVuMeter', `state_combined_room=${state_combined_room}`);

  if(B_CAMERA_VIEW_AUTO && LVCR_ROLE_SELF == LVCR_ROLE_1) {
    const lvcr1_mic = device_setting[LVCR_ROLE_1].combined_mode.audio_input_mic_combined_1_2_3;
    for(const val of lvcr1_mic)
      if(val.Type == MIC_CEILING && val.LocateAt) {
        const val_id = val.id.toString();
        mic_meters[val_id] = {'id': val_id, 'Type': MIC_CEILING, 'LocateAt': val.LocateAt, 'VuMeter': []};
        for(let i = 0; i < AUDIO_VU_METER.BufferSize; i++)
          mic_meters[val_id].VuMeter[i] = 0;
        xcommand('Audio VuMeter Start', {ConnectorId: val.id, ConnectorType: AUDIO_VU_METER.ConnectorType, IntervalMs: AUDIO_VU_METER.IntervalMs, Source: AUDIO_VU_METER.Source});
      }

    b_init_vumeter = true;
  }

  if(b_init_vumeter) {
    xapi.event.on('Audio Input Connectors Microphone', (event) => cbVuMeter(event));
    setTimeout(cbVuMeterCheck, TIMER_VU_CHECK);
  }
}

async function stopVuMeter() {
  handleLog('stopVuMeter');
  xcommand('Audio VuMeter StopAll');
}

async function clearVuMeter() {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('clearVuMeter', `b_init_vumeter=${b_init_vumeter}, state_combined_room=${state_combined_room}`);
  if(LVCR_ROLE_SELF == LVCR_ROLE_1 && b_init_vumeter) {
    const lvcr1_mic = device_setting[LVCR_ROLE_1].combined_mode.audio_input_mic_combined_1_2_3;
    for(const val of lvcr1_mic)
      if(val.Type == MIC_CEILING && val.LocateAt) {
        const val_id = val.id.toString();
        for(let i = 0; i < AUDIO_VU_METER.BufferSize; i++)
          mic_meters[val_id].VuMeter[i] = 0;
      }
  }
}

async function cbVuMeterCheck() {
  const setting = device_setting[LVCR_ROLE_SELF];
  const lvcr1_setting = device_setting[LVCR_ROLE_1];
  const state_combined_room = setting.control.state_combined_room;
  const state_mute = setting.control.state_mute;
  const state_mic_ceiling = setting.control.state_mic_ceiling;
  const state_mic_wireless = setting.control.state_mic_wireless;
  const camera_1_mic_offset = setting.control.camera_1_mic_offset;
  const camera_2_mic_offset = setting.control.camera_2_mic_offset;
//  handleLog('cbVuMeterCheck', `state_combined_room=${state_combined_room}, state_mute=${state_mute}, state_mic_ceiling=${state_mic_ceiling}, state_mic_wireless=${state_mic_wireless}, camera_1_mic_offset=${camera_1_mic_offset}`);
  if(B_CAMERA_VIEW_AUTO && LVCR_ROLE_SELF == LVCR_ROLE_1 && state_combined_room && lvcr1_setting.control.ui_camera_view == C.AUTO && setting.control.state_camera_position == C.CAMERA_FRONT) {
    const pt_status = await xapi.status.get('Cameras PresenterTrack Status').catch(e => {return ''});
    if(state_mute == C.ON || state_mic_ceiling == C.OFF) {
      if(camera_active_view != 0) {
        xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.combined_mode.video_main_source_combined_1_2_3});
        camera_active_view = 0;
        camera_score['camera_1'] = 0;
        camera_score['camera_2'] = 0;
        camera_score['camera_3'] = 0;
        camera_score['camera_tie'] = 0;
      }
    }
    else if(pt_status == 'Off') {
      let camera_1 = camera_1_mic_offset;
      let camera_2 = camera_2_mic_offset;
      let camera_3 = 0;

      for(const mic of Object.values(mic_meters)) {
        if(mic.Type == MIC_CEILING) {
//          handleDebug('cbVuMeterCheck', `mic ${mic.id}`, mic);
          if(mic.LocateAt == LVCR_ROLE_1 && LVCR_DESIGN_SELF == LVCR_DESIGN_33 && mic.id != 1)
            for(const val of mic_meters[mic.id].VuMeter)  camera_1 = camera_1 + parseInt(val);
          else if(mic.LocateAt == LVCR_ROLE_2)
            for(const val of mic_meters[mic.id].VuMeter)  camera_2 = camera_2 + parseInt(val);
          else if(mic.LocateAt == LVCR_ROLE_3)
            for(const val of mic_meters[mic.id].VuMeter)  camera_3 = camera_3 + parseInt(val);
        }
      }

      if(camera_1 >= camera_2 + THRESHOLD_MIC_VU && camera_1 >= camera_3 + THRESHOLD_MIC_VU) {
        camera_score['camera_1'] = camera_score['camera_1'] + 1;
        camera_score['camera_2'] = 0;
        camera_score['camera_3'] = 0;
        camera_score['camera_tie'] = 0;
      }
      else if(camera_2 >= camera_1 + THRESHOLD_MIC_VU && camera_2 >= camera_3 + THRESHOLD_MIC_VU) {
        camera_score['camera_1'] = 0;
        camera_score['camera_2'] = camera_score['camera_2'] + 1;
        camera_score['camera_3'] = 0;
        camera_score['camera_tie'] = 0;
      }
      else if(camera_3 >= camera_1 + THRESHOLD_MIC_VU && camera_3 >= camera_2 + THRESHOLD_MIC_VU) {
        camera_score['camera_1'] = 0;
        camera_score['camera_2'] = 0;
        camera_score['camera_3'] = camera_score['camera_3'] + 1;
        camera_score['camera_tie'] = 0;
      }
      else {
        camera_score['camera_1'] = 0;
        camera_score['camera_2'] = 0;
        camera_score['camera_3'] = 0;
        camera_score['camera_tie'] = camera_score['camera_tie'] + 1;
      }

      handleDebug('cbVuMeterCheck', `active_view=${camera_active_view}, camera_1=${camera_1}, camera_2=${camera_2}, camera_3=${camera_3}, camera_1_offset=${camera_1_mic_offset}, camera_2_offset=${camera_2_mic_offset}`, `score`, camera_score, `mic`, Object.keys(mic_meters));
      if(camera_score['camera_1'] >= THRESHOLD_CAMERA_SWITCH) {
        if(camera_active_view != 1)  xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source});
        camera_active_view = 1;
        camera_score['camera_1'] = 0;
      }
      else if(camera_score['camera_2'] >= THRESHOLD_CAMERA_SWITCH) {
        if(camera_active_view != 2)  xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source_2});
        camera_active_view = 2;
        camera_score['camera_2'] = 0;
      }
      else if(camera_score['camera_3'] >= THRESHOLD_CAMERA_SWITCH) {
        if(camera_active_view != 3)  xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source_3});
        camera_active_view = 3;
        camera_score['camera_3'] = 0;
      }
      else if(camera_score['camera_tie'] >= THRESHOLD_CAMERA_SWITCH) {
        let video_main_source_combined = setting.combined_mode.video_main_source_combined_1_2_3;
        if(state_combined_room == STATE_COMBINED_ROOM_1_2)  video_main_source_combined = setting.combined_mode.video_main_source_combined_1_2;
        else if(state_combined_room == STATE_COMBINED_ROOM_1_3)  video_main_source_combined = setting.combined_mode.video_main_source_combined_1_3;

        if(camera_active_view != 0)  xcommand('Video Input SetMainVideoSource', {ConnectorID: video_main_source_combined});
        camera_active_view = 0;
        camera_score['camera_tie'] = 0;
      }
    }
  }

  setTimeout(cbVuMeterCheck, TIMER_VU_CHECK);
}

/* LVCR Room 1
*/
async function lvcr1_initConfig() {
  handleLog('lvcr1_initConfig');
  const camera = await xapi.status.get('Cameras Camera').catch(e => {return ''});
  handleDebug('lvcr1_initConfig', `camera`, camera);

  if(!camera) {
    handleError('lvcr1_initConfig');
    return;
  }

  await common_initConfig();

  const setting = device_setting[LVCR_ROLE_SELF];

  let presenter_camera_id = setting.presenter_camera_id;
  let presenter_camera_input = setting.presenter_camera_input;

  handleLog('lvcr1_initConfig', `presenter_camera_id=${presenter_camera_id}, presenter_camera_input=${presenter_camera_input}, camera.length=${camera.length}`);
  if(camera && presenter_camera_input != '0') {
    await xconfig(`Cameras PresenterTrack Connector`, presenter_camera_input);

    if(presenter_camera_id != '0' && camera.length >= presenter_camera_id && camera[presenter_camera_id-1].SerialNumber) {
      await xconfig(`Cameras Camera ${presenter_camera_id} AssignedSerialNumber`, camera[presenter_camera_id-1].SerialNumber);
    }
  }

  await common_cbSensorState();

  if(B_CAMERA_VIEW_AUTO)  await initVuMeter();
}

async function lvcr1_setCombinedMode() {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('lvcr1_setCombinedMode', `state_combined_room=${state_combined_room}`);
  const audio_mic = await xapi.config.get(`Audio Microphones`).catch(e => {return ''});
  const camera = await xapi.config.get(`Cameras`).catch(e => {return ''});
//  const mute = await xapi.status.get(`Audio Microphones Mute`).catch(e => {return 'Off'});
  handleDebug('lvcr1_setCombinedMode', `audio_mic`, audio_mic)
  handleDebug('lvcr1_setCombinedMode', `camera`, camera)
//  handleDebug('lvcr1_setCombinedMode', `mute=${mute}`)

  if(!audio_mic || !camera) {
    handleError('lvcr1_setCombinedMode');
    return;
  }

  switch(state_combined_room) {
  case STATE_COMBINED_ROOM_1_2:
    setting.combined_mode.audio_input_mic = JSON.parse(JSON.stringify(setting.combined_mode.audio_input_mic_combined_1_2));
    setting.combined_mode.audio_output_line = JSON.parse(JSON.stringify(setting.combined_mode.audio_output_line_combined_1_2));
    setting.audio_mic_wireless = JSON.parse(JSON.stringify(setting.audio_mic_wireless_combined_1_2));
    break;

  case STATE_COMBINED_ROOM_1_3:
    setting.combined_mode.audio_input_mic = JSON.parse(JSON.stringify(setting.combined_mode.audio_input_mic_combined_1_3));
    setting.combined_mode.audio_output_line = JSON.parse(JSON.stringify(setting.combined_mode.audio_output_line_combined_1_3));
    setting.audio_mic_wireless = JSON.parse(JSON.stringify(setting.audio_mic_wireless_combined_1_3));
    break;

  case STATE_COMBINED_ROOM_1_2_3:
    setting.combined_mode.audio_input_mic = JSON.parse(JSON.stringify(setting.combined_mode.audio_input_mic_combined_1_2_3));
    setting.combined_mode.audio_output_line = JSON.parse(JSON.stringify(setting.combined_mode.audio_output_line_combined_1_2_3));
    setting.audio_mic_wireless = JSON.parse(JSON.stringify(setting.audio_mic_wireless_combined_1_2_3));
    break;

  default:
    handleError('lvcr1_setCombinedMode', `state_combined_room=${state_combined_room}`);
    return;
  }

  await clearVuMeter();
  await common_setMode(setting.combined_mode);

  if(setting.combined_mode.disable_ultrasound)    await xconfig('Audio Ultrasound MaxVolume', '0');

  if(!!audio_mic.NoiseRemoval && setting.combined_mode.force_noise_removal) await xcommand('Audio Microphones NoiseRemoval Activate');
  if(!!camera.SpeakerTrack && setting.combined_mode.force_speaker_track)    await xcommand('Cameras SpeakerTrack Activate');

  if(setting.control.ui_camera_view != C.DISABLE) {
  //    await xcommand('Cameras SpeakerTrack Deactivate');
    await lvcr1_setCameraView();
  }

  await xcommand('Conference DoNotDisturb Activate', {Timeout: setting.control.timeout_dnd});
//    await xcommand('Video Selfview Set', {Mode: 'On'});

  const xml = await rebuildUI();
  if(xml != setting.control.state_xml)  await restoreExtension(xml);
  setting.control.state_xml = xml;
  await updateUI();
}

async function lvcr1_setStandaloneMode() {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('lvcr1_setStandaloneMode', `state_combined_room=${state_combined_room}`);

  setting.audio_mic_wireless = setting.audio_mic_wireless_lvcr30;

  await common_setMode(setting.standalone_mode);

  await xconfig('Audio Ultrasound MaxVolume', setting.audio_ultrasound_max_volume);
  await xconfig('Standby Control', 'On');
  await xconfig('UserInterface OSD Mode', 'Auto');

  await xcommand('Conference DoNotDisturb Deactivate');
//  await xcommand('Video Selfview Set', {Mode: 'On'});
  await xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source});

  const xml = await rebuildUI();
  if(xml != setting.control.state_xml)  await restoreExtension(xml);
  setting.control.state_xml = xml;
  await updateUI();
}

async function lvcr1_setCameraView(value='') {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  let ui_camera_view = setting.control.ui_camera_view;
  const pt_status = await xapi.status.get('Cameras PresenterTrack Status').catch(e => {return ''});
  handleLog('lvcr1_setCameraView', `state_combined_room=${state_combined_room}, value=${value}, ui_camera_view=${ui_camera_view}, pt_status=${pt_status}`);
  const call = await xapi.status.get('Call').catch(e => {return ''});
  handleDebug('lvcr1_setCameraView', `call`, call);

//  if(!state_combined_room || !call)   return;
  let video_main_source = setting.video_main_source;
  switch(state_combined_room) {
  case STATE_COMBINED_ROOM_1_2:
    video_main_source = setting.combined_mode.video_main_source_combined_1_2;
    break;
  case STATE_COMBINED_ROOM_1_3:
    video_main_source = setting.combined_mode.video_main_source_combined_1_3;
    break;
  case STATE_COMBINED_ROOM_1_2_3:
    video_main_source = setting.combined_mode.video_main_source_combined_1_2_3;
    break;
  }

  if(value) {
    setting.control.ui_camera_view = value;
    ui_camera_view = value;
  }

  if(state_combined_room.includes('1_2') || state_combined_room.includes('1_3')) {
    let postion = '';

    switch(ui_camera_view) {
    case C.AUTO:
      await xcommand('Video Input SetMainVideoSource', {ConnectorID: video_main_source});
      await unsetWidgetValue(widgetIds.last_camera_preset);
      setting.control.state_camera_position = C.CAMERA_FRONT;
      camera_active_view = 0;
      break;

    case C.ALWAYS:
      await xcommand('Video Input SetMainVideoSource', {ConnectorID: video_main_source});
      await unsetWidgetValue(widgetIds.last_camera_preset);
      break;

    case '1':
      await xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source});
      postion = `Last Camera Position: Room 1 Front`;
      await setWidgetValue(widgetIds.last_camera_preset, postion);
      break;

    case '2':
      await xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source_2});
      postion = `Last Camera Position: Room 2 Front`;
      await setWidgetValue(widgetIds.last_camera_preset, postion);
      break;

    case '3':
      await xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source_3});
      postion = `Last Camera Position: Room 2 Front`;
      await setWidgetValue(widgetIds.last_camera_preset, postion);
      break;
    }
  }
  else {
    await xcommand('Cameras SpeakerTrack Activate');
    await xcommand('Video Input SetMainVideoSource', {ConnectorID: setting.video_main_source});
    await unsetWidgetValue(widgetIds.last_camera_preset);
  }

  await unsetWidgetValue(widgetIds.camera_preset);
}

async function lvcr1_cbStandby(event='') {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('lvcr1_cbStandby', `state_combined_room=${state_combined_room}`, event);
  if(B_COMMON_STANDBY && LVCR_ROLE_SELF == LVCR_ROLE_1) {
    if(!event)  event = await xapi.status.get('Standby').catch(e => {return ''});

    if(event && event.State != C.STANDBY_ENTERING) {
      const gpio_value = (event.State == 'Standby')? GPIO_STANDBY.State.activate : GPIO_STANDBY.State.deactivate;
      await setGpioState(GPIO_STANDBY.id, gpio_value);
    }
  }
}

/* LVCR Room 2
*/
async function lvcrX_initConfig() {
  handleLog('lvcrX_initConfig', `lvcr_role=${LVCR_ROLE_SELF}`);
  const camera = await xapi.status.get('Cameras Camera').catch(e => {return ''});
  handleDebug('lvcrX_initConfig', `camera`, camera);

  if(!camera) {
    handleError('lvcrX_initConfig');
    return;
  }

  await common_initConfig();

  const setting = device_setting[LVCR_ROLE_SELF];

  let presenter_camera_id = setting.presenter_camera_id;
  let presenter_camera_input = setting.presenter_camera_input;

  handleLog('lvcrX_initConfig', `presenter_camera_id=${presenter_camera_id}, presenter_camera_input=${presenter_camera_input}, camera.length=${camera.length}`);
  if(camera && presenter_camera_input != '0') {
    await xconfig(`Cameras PresenterTrack Connector`, presenter_camera_input);

    if(presenter_camera_id != '0' && camera.length >= presenter_camera_id && camera[presenter_camera_id-1].SerialNumber) {
      await xconfig(`Cameras Camera ${presenter_camera_id} AssignedSerialNumber`, camera[presenter_camera_id-1].SerialNumber);
    }
  }

  await common_cbSensorState();
}

async function lvcr2_cbCallConnected(event) {
  handleLog('lvcr2_cbCallConnected', event);
  switch(event) {
  case 'Dialling':
  case 'Ringing':
  case 'Connecting':
  case 'Connected':
  default:
    break;
  }
}

/* LVCR Room 3
*/

/* LVCR Room 4
*/

/**********************************************************************************/
/**/
async function toggleNoiseRemoval(value) {
  value = value.toLowerCase();
  handleLog('toggleNoiseRemoval', `value=${value}`);
  if(value == C.ON)  await xcommand(`Audio Microphones NoiseRemoval Activate`);
  else               await xcommand(`Audio Microphones NoiseRemoval Deactivate`);
}

async function buttonCombineRoom(value) {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_gpio_combine = setting.control.state_gpio_combine;
  handleLog('buttonCombineRoom', `role=${LVCR_ROLE_SELF}, state_gpio_combine=0x${state_gpio_combine.toString(16).padStart(4, "0")}, value=${value}`);
  switch(value) {
  case STATE_COMBINED_ROOM_1:
    setting.control.state_combined_room = '';
    if(LVCR_ROLE_SELF == LVCR_ROLE_1) await lvcr1_setStandaloneMode();
    else  await common_setStandaloneMode();
    break;

  case STATE_COMBINED_ROOM_1_2:
    setting.control.state_combined_room = value;
    if(LVCR_ROLE_SELF == LVCR_ROLE_1)   await lvcr1_setCombinedMode();
    else if(LVCR_ROLE_SELF == LVCR_ROLE_2)   await common_setCombinedMode();
    break;

  case STATE_COMBINED_ROOM_1_3:
    setting.control.state_combined_room = value;
    if(LVCR_ROLE_SELF == LVCR_ROLE_1)   await lvcr1_setCombinedMode();
    else if(LVCR_ROLE_SELF == LVCR_ROLE_3)   await common_setCombinedMode();
    break;

  case STATE_COMBINED_ROOM_1_2_3:
    setting.control.state_combined_room = value;
    if(LVCR_ROLE_SELF == LVCR_ROLE_1)   await lvcr1_setCombinedMode();
    else if(LVCR_ROLE_SELF == LVCR_ROLE_2)   await common_setCombinedMode();
    else if(LVCR_ROLE_SELF == LVCR_ROLE_3)   await common_setCombinedMode();
    break;
  }

  const status_combine = (setting.control.state_combined_room)? MAP_STATE_COMBINE_NAME[setting.control.state_combined_room] : C.STANDALONE_C;
  await setWidgetValue(widgetIds.status_combine, status_combine);
}

async function setCamaerPosition(event) {
  const setting = device_setting[LVCR_ROLE_SELF];
  handleLog('setCamaerPosition', `event=`, event);
  let postion = '';
  let b_ret = false;

  setting.control.state_camera_position = event.Value;
  switch(event.Value) {
  case C.CAMERA_FRONT:
    postion = cameras.speaker_track.name;
    b_ret = await setCameraTrack(event.Value, cameras);
    break;

  case C.CAMERA_REAR:
    const state_presenter = await xapi.status.get(`Cameras PresenterTrack`).catch(e => {return {Availability: 'Unavailable'}});
    postion = cameras.presenter_track.name;
    if(state_presenter.Availability == 'Available')   b_ret = await setCameraTrack(event.Value, cameras);
    else  postion = `PresenterTrack is ${state_presenter.Availability.toLowerCase()}.`;
    break;

  default:
    const camera_preset = await xcommand(`Camera Preset Show`, {PresetId: event.Value});
    const connector_id = (camera_preset.CameraId) ? await xapi.status.get(`Cameras Camera ${camera_preset.CameraId} DetectedConnector`).catch(e => {return ''}) : '';
    postion = (camera_preset.Name) ? camera_preset.Name : event.Value;
    handleDebug('setCamaerPosition', `postion=${postion}, connector_id=${connector_id}`, camera_preset);
    await setCameraPreset(camera_preset.PresetId, connector_id);
    b_ret = true;
  }

  await unsetWidgetValue(widgetIds.camera_preset);
  if(b_ret) {
    postion = `Last Camera Position: ${postion}`;
    await setWidgetValue(widgetIds.last_camera_preset, postion);
  }
  else if(C.CAMERA_REAR == event.Value) {
    await setWidgetValue(widgetIds.last_camera_preset, postion);
  }
}

async function setCameraTrack(camera_track, camera) {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('setCameraTrack', `camera_track=${camera_track}, state_combined_room=${state_combined_room}`);
  let b_ret = false;
  if(camera_track == C.CAMERA_FRONT) {
    await xcommand('Cameras PresenterTrack Set', {Mode: 'Off'});
    await xcommand('Cameras SpeakerTrack Activate');
    if(LVCR_ROLE_SELF == LVCR_ROLE_1 && state_combined_room && setting.control.ui_camera_view != C.DISABLE)
      await lvcr1_setCameraView();
    else  await xcommand('Video Input SetMainVideoSource', {ConnectorId: camera.speaker_track.connector});
    b_ret = true;
  }
  else if(camera_track == C.CAMERA_REAR) {
    const presenter_enable = await xapi.config.get(`Cameras PresenterTrack Enabled`).catch(e => {return ''});
    if(presenter_enable == 'True') {
      await xcommand('Cameras PresenterTrack Set', {Mode: 'Follow'});
      await xcommand('Cameras SpeakerTrack Deactivate');
      await xcommand('Video Input SetMainVideoSource', {ConnectorId: camera.presenter_track.connector});
      b_ret = true;
    }
  }

  return b_ret;
}

async function checkMicState() {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_mic_wireless = setting.control.state_mic_wireless;
  const mic_1_mode = await xapi.config.get('Audio Input Microphone 1 Mode').catch(e => {return ''});
  handleLog('checkMicState', `mic_1_mode=${mic_1_mode}, state_mic_wireless=${state_mic_wireless}`);

  if(mic_1_mode.toLowerCase() == C.OFF && state_mic_wireless == C.OFF)  await setMicMode(1, C.ON);
}

async function setMicMode(id, value) {
  value = value.toLowerCase();
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('setMicMode', `id=${id}, value=${value}, state_combined_room=${state_combined_room}`);

  if(id == 1) {
    if(value == C.ON) {
      setting.control.state_mic_ceiling = C.ON;
      setting.control.state_mic_wireless = C.OFF;
      for(const id of setting.audio_mic_wireless)
        if(!!id)  await xconfig(`Audio Input Microphone ${id} Mode`, 'Off');
    }
    else  setting.control.state_mic_ceiling = C.OFF;

    let audio_input_mic = [];
    let b_standalone = (state_combined_room)? false : true;
    if(b_standalone)  audio_input_mic = setting.standalone_mode.audio_input_mic;
    else audio_input_mic = setting.combined_mode.audio_input_mic;

    for(const val of audio_input_mic)
      if(val.Type == MIC_CEILING) {
        if(val.LocateAt == LVCR_ROLE_SELF || !b_standalone)  await xconfig(`Audio Input Microphone ${val.id} Mode`, value);
        else  await xconfig(`Audio Input Microphone ${val.id} Mode`, 'Off');
      }
  }
  else {
    if(value == C.ON) {
      setting.control.state_mic_ceiling = C.OFF;
      setting.control.state_mic_wireless = C.ON;
      for(const val of setting.combined_mode.audio_input_mic)
        if(val.Type == MIC_CEILING)  await xconfig(`Audio Input Microphone ${val.id} Mode`, 'Off');
    }

    await xconfig(`Audio Input Microphone ${id} Mode`, value);
  }

  handleLog('setMicMode', `id=${id}, value=${value}, state_combined_room=${state_combined_room}, state_mic_ceiling=${setting.control.state_mic_ceiling}, state_mic_wireless=${setting.control.state_mic_wireless}`);
}

async function setMicLevel(id, value) {
  value = value.toLowerCase();
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('setMicLevel', `id=${id}, value=${value}, state_combined_room=${state_combined_room}`);

  const mics = await xapi.config.get('Audio Input Microphone').catch(e => {return -1});
  if(mics != -1) {
    const level = await micDbCrementor(value, mics[id-1].Level, setting.audio_mic_level_db_max);

    if(id == 1) {
      for(const val of setting.combined_mode.audio_input_mic)
        await xconfig(`Audio Input Microphone ${val.id} Level`, level);
    }
    else
      await xconfig(`Audio Input Microphone ${id} Level`, level);
  }
}

async function VideoOutputReset(cb_from='', value='', b_ui=true) {
  handleLog('VideoOutputReset', `cb_from=${cb_from}, value=${value}, b_ui=${b_ui}`);
  const setting = device_setting[LVCR_ROLE_SELF];
  const monitor_preset_id = ('' == value) ? setting.control.monitor_preset_id : value;
  const video_monitor_preset = setting.video_monitor_preset[monitor_preset_id].output_connecters;
  handleLog('VideoOutputReset', `cb_from=${cb_from}, value=${value}, monitor_preset_id=${monitor_preset_id}, b_ui=${b_ui}`, video_monitor_preset);

  setting.control.monitor_preset_id = monitor_preset_id;
  for(const val of video_monitor_preset) {
    if(!!val.MonitorRole)   await xconfig(`Video Output Connector ${val.id} MonitorRole`, video_monitor_preset[val.id-1].MonitorRole);
  }

  if(b_ui)  await updateUI({'video': {'monitor_preset_id': monitor_preset_id}});
}

/**/
let widget_pending_update = {};
let timer_update_ui = 0;
async function delayed_updateUI() {
  const widgets = widget_pending_update;
  const b_widget = (Object.keys(widgets).length > 0) ? true : false;
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('delayed_updateUI', `state_combined_room=${state_combined_room}, b_widget=${b_widget}, widgets`, widgets);

  const status_combine = (state_combined_room)? MAP_STATE_COMBINE_NAME[state_combined_room] : C.STANDALONE_C;
  await setWidgetValue(widgetIds.status_combine, status_combine);

  if(SHOW_PAGE_AUDIO && (!b_widget || C.AUDIO in widgets)) {
    const input_mic = await xapi.config.get('Audio Input Microphone').catch(e => {return []});
    const output_line_1 = await xapi.config.get('Audio Output Line 1').catch(e => {return -1});
    const noise_removal = await xapi.status.get('Audio Microphones NoiseRemoval').catch(e => {return 'Off'});
//    handleDebug('delayed_updateUI', `widgets`, widgets, `input_mic`, input_mic);
    handleDebug('delayed_updateUI', `widgets`, widgets, `output_line_1`, output_line_1);
    handleDebug('delayed_updateUI', `widgets`, widgets, `noise_removal=${noise_removal}`);

    if(input_mic.length > 0) {
      await setWidgetValue(widgetIds.mic_1_mode, input_mic[0].Mode);
//      await setWidgetValue(widgetIds.mic_1_level, input_mic[0].Level);

      for(let i=0; i<setting.control.ui_wireless_mic; i++) {
        let mic_id = setting.audio_mic_wireless[i];
        await setWidgetValue(`toggle-mic_${mic_id}_mode`, input_mic[mic_id-1].Mode);
        await setWidgetValue(`spinner-mic_${mic_id}_level`, input_mic[mic_id-1].Level);
      }

      if(LVCR_ROLE_SELF == LVCR_ROLE_1 && setting.control.state_combined_room) {
        const lvcr2_setting = device_setting[LVCR_ROLE_2];
        const lvcr3_setting = device_setting[LVCR_ROLE_3];
        if(state_combined_room.includes('_2') && lvcr2_setting.control.ui_wireless_mic) {
          const mic_id = 6;
          await setWidgetValue(`toggle-mic_${mic_id}_mode`, input_mic[mic_id-1].Mode);
          await setWidgetValue(`spinner-mic_${mic_id}_level`, input_mic[mic_id-1].Level);
        }
        if(state_combined_room.includes('_3') && lvcr3_setting.control.ui_wireless_mic) {
          const mic_id = 8;
          await setWidgetValue(`toggle-mic_${mic_id}_mode`, input_mic[mic_id-1].Mode);
          await setWidgetValue(`spinner-mic_${mic_id}_level`, input_mic[mic_id-1].Level);
        }
      }
    }

    if(B_UI_CEILING_SPEAKER && output_line_1 != -1) {
      await setWidgetValue(widgetIds.speaker_ceiling_mode, output_line_1.Mode);
      await setWidgetValue(widgetIds.speaker_ceiling_level, convertAudioOutputLevel(output_line_1.Level));
    }

    if(B_UI_NOISE_REMOVAL)  await setWidgetValue(widgetIds.noise_removal, noise_removal);
  }

  if(SHOW_PAGE_CAMERA && (!b_widget || C.CAMERA in widgets)) {
    const selfview = await xapi.status.get('Video Selfview').catch(e => {return ''});
    if(selfview.Mode)   await setWidgetValue(widgetIds.camera_selfview, selfview.Mode);
    await unsetWidgetValue(widgetIds.last_camera_preset);
  }

  if(SHOW_PAGE_CAMERA && LVCR_ROLE_SELF == LVCR_ROLE_1 && state_combined_room.includes('1_2')) {
    if(setting.control.ui_camera_view != C.DISABLE)
      await setWidgetValue(widgetIds.camera_view, setting.control.ui_camera_view);
  }

  if(SHOW_PAGE_DISPLAY && (!b_widget || C.VIDEO in widgets) && MONITOR_DUAL == setting.video_monitors) {
    const monitor_preset_id = setting.control.monitor_preset_id;
    handleDebug('delayed_updateUI', `widgets`, widgets, `monitor_preset_id=${monitor_preset_id}`);
    await setWidgetValue(widgetIds.monitor_preset, monitor_preset_id);
  }

  widget_pending_update = {};
}

async function updateUI(widgets={}, force=false) {
  const cnt_widget = Object.keys(widgets).length;
  handleLog('updateUI', `force=${force}, timer_update_ui=${timer_update_ui}`, `cnt_widget=${cnt_widget}`, widgets);

  if(cnt_widget > 0) {
    const key = Object.keys(widgets)[0];
    if(!widget_pending_update.hasOwnProperty(key))  widget_pending_update[key] = [];

    widget_pending_update[key].push(widgets);
  }

  clearTimeout(timer_update_ui);
  if(force) await delayed_updateUI();
  else      timer_update_ui = setTimeout(delayed_updateUI, TIMER_UPDATE_UI);
}

/**/
let page_audio = '';
let page_camera = '';
let page_control = '';
let page_display = '';
let page_test = '';
async function rebuildUI() {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('rebuildUI', `state_combined_room=${state_combined_room}, ui_wireless_mic=${setting.control.ui_wireless_mic}`, setting.audio_mic_wireless);

  if(SHOW_PAGE_AUDIO) {
    let row_mic_wirless = '';
    let ui_id = 1;
    let mic_id = '';
    if(LVCR_ROLE_SELF == LVCR_ROLE_2)   ui_id = 3;
    else if(LVCR_ROLE_SELF == LVCR_ROLE_3)   ui_id = 5;

    for(let i=0; i<setting.control.ui_wireless_mic; i++) {
      let mic_id = setting.audio_mic_wireless[i];
      row_mic_wirless += ROW_MIC_WIRELESS.replace('%NAME%', `Wireless Mic ${ui_id}`).replace('%WIDGET_TOGGLE%', `toggle-mic_${mic_id}_mode`).replace('%WIDGET_SPINNER%', `spinner-mic_${mic_id}_level`);
      ui_id += 1;
    }

    if(LVCR_ROLE_SELF == LVCR_ROLE_1 && state_combined_room) {
      const lvcr2_setting = device_setting[LVCR_ROLE_2];
      const lvcr3_setting = device_setting[LVCR_ROLE_3];
      if(state_combined_room.includes('_2') && lvcr2_setting.control.ui_wireless_mic) {
        ui_id = 3;
        mic_id = 6;
        row_mic_wirless += ROW_MIC_WIRELESS.replace('%NAME%', `Wireless Mic ${ui_id}`).replace('%WIDGET_TOGGLE%', `toggle-mic_${mic_id}_mode`).replace('%WIDGET_SPINNER%', `spinner-mic_${mic_id}_level`);
      }
      if(state_combined_room.includes('_3') && lvcr3_setting.control.ui_wireless_mic) {
        ui_id = 5;
        mic_id = 8;
        row_mic_wirless += ROW_MIC_WIRELESS.replace('%NAME%', `Wireless Mic ${ui_id}`).replace('%WIDGET_TOGGLE%', `toggle-mic_${mic_id}_mode`).replace('%WIDGET_SPINNER%', `spinner-mic_${mic_id}_level`);
      }
    }

    const row_remark_mic = (setting.control.ui_wireless_mic > 0)? ROW_REMARK_MIC : '';
    const row_remark_mic_exclusive = (B_MIC_EXCLUSIVE && setting.control.ui_wireless_mic > 0) ? ROW_REMARK_MIC_EXCLUSIVE : '';
    const row_ceiling_speaker = (B_UI_CEILING_SPEAKER) ? ROW_CEILING_SPEAKER : '';
    const row_noise_removal = (B_UI_NOISE_REMOVAL)? ROW_NOISE_REMOVAL : '';
    page_audio = PAGE_AUDIO.replace('%ROW_MIC_WIRELESS%', row_mic_wirless).replace('%ROW_REMARK_MIC%', row_remark_mic).replace('%ROW_REMARK_MIC_EXCLUSIVE%', row_remark_mic_exclusive).replace('%ROW_CEILING_SPEAKER%', row_ceiling_speaker).replace('%ROW_NOISE_REMOVAL%', row_noise_removal);
  }

  if(SHOW_PAGE_CAMERA) {
    let row_camera_view = '';
    let row_camera_preset = '';
    const camera_preset = await xcommand('Camera Preset List');
    const cnt_camera_preset = camera_preset.Preset? camera_preset.Preset.length : 0;
    handleDebug('rebuildUI', `cnt_camera_preset=${cnt_camera_preset}, camera_preset`, camera_preset);

    if(LVCR_ROLE_SELF == LVCR_ROLE_1 && setting.control.ui_camera_view != C.DISABLE) {
      switch(state_combined_room) {
      case STATE_COMBINED_ROOM_1_2:
        row_camera_view = ROW_CAMERA_VIEW_1_2;
        break;
      case STATE_COMBINED_ROOM_1_3:
        row_camera_view = ROW_CAMERA_VIEW_1_3;
        break;
      case STATE_COMBINED_ROOM_1_2_3:
        row_camera_view = ROW_CAMERA_VIEW_1_2_3;
        break;
      }
    }

    if (cnt_camera_preset) {
      let cnt_index = 0;
      for(const val of camera_preset.Preset) {
          const key = val.PresetId;
          const name = val.Name;
          row_camera_preset += ROW_CAMERA_PRESET.replace("%KEY%", key).replace("%NAME%", name);
          if (++cnt_index == CAMERA_PRESET_MAX)  break;
      }
    }

    page_camera = PAGE_CAMERA.replace('%ROW_CAMERA_VIEW%', row_camera_view).replace('%ROW_CAMERA_PRESET%', row_camera_preset).replace('&', '&#38;');
  }

  if(!page_control) {
    const row_status_combine = ROW_STATUS_COMBINE;
    page_control = PAGE_CONTROL.replace('%ROW_STATUS_COMBINE%', row_status_combine);
  }

  if(TEST_BTN_COMBINE_ROOM) {
    page_test = PAGE_TEST.replace('%ROW_COMBINE_ROOM%', ROW_COMBINE_ROOM);
  }

  if(SHOW_PAGE_DISPLAY && !page_display && MONITOR_DUAL == setting.video_monitors) {
    page_display = (SHOW_PAGE_DISPLAY) ? PAGE_DISPLAY : '';
  }

  const xml = PANEL_ROOM_CONTROL.replace('%PAGE_AUDIO%', page_audio).replace('%PAGE_CAMERA%', page_camera).replace('%PAGE_CONTROL%', page_control).replace('%PAGE_DISPLAY%', page_display).replace('%PAGE_TEST%', page_test);
  return xml;
}

/**********************************************************************************/
/**/
async function cbCallConnected(event) {
  handleLog('cbCallConnected', event);
  if('Connected' == event) {
    const setting = device_setting[LVCR_ROLE_SELF];
    await checkMicState();

    if(setting.control.ui_wireless_mic > 0) {
      const state_mic_wireless = setting.control.state_mic_wireless;
      const message = (state_mic_wireless == C.ON)? MSG_MIC_WIRELESS : MSG_MIC_CEILING;
      await displayAlertMessage(message);
    }
  }
}

async function cbWidgetAction(event, cb_from='') {
  handleLog('cbWidgetAction', `cb_from=${cb_from}`, event);
  let event_type = '';
  if(!!event.Type) event_type = event.Type.toLowerCase();
  if(event_type == 'pressed')  return;

  let id = event.WidgetId;
  const event_value = event.Value;

  switch(event.PanelId) {
  case PANEL_ID:
    const setting = device_setting[LVCR_ROLE_SELF];
    const xml = await rebuildUI();
    if(xml != setting.control.state_xml)  await restoreExtension(xml);
    setting.control.state_xml = xml;
    await updateUI({'camera': {}}, true);
    return;
  }

  switch(event.WidgetId) {
  case widgetIds.combine_room:
    if(event_type == 'released')  await buttonCombineRoom(event_value);
    break;

  case widgetIds.camera_preset:
    if(event_type == 'released') {
      await setCamaerPosition(event);
    }
    break;

  case widgetIds.camera_selfview:
    if(event_type == 'changed') {
      await xcommand('Video Selfview Set', {Mode: event_value});
    }
    break;

  case widgetIds.camera_view:
    if(event_type == 'released')  await lvcr1_setCameraView(event_value);
    break;

  case widgetIds.mic_1_mode:
  case widgetIds.mic_3_mode:
  case widgetIds.mic_4_mode:
  case widgetIds.mic_5_mode:
  case widgetIds.mic_6_mode:
  case widgetIds.mic_7_mode:
  case widgetIds.mic_8_mode:
    id = parseInt(id[id.length - 6]);
    if(event_type == 'changed')  await setMicMode(id, event_value);
    break;

  case widgetIds.mic_1_level:
  case widgetIds.mic_3_level:
  case widgetIds.mic_4_level:
  case widgetIds.mic_5_level:
  case widgetIds.mic_6_level:
  case widgetIds.mic_7_level:
  case widgetIds.mic_8_level:
    id = parseInt(id[id.length - 7]);
    if(event_type == 'clicked') await setMicLevel(id, event_value);
    break;

  case widgetIds.monitor_preset:
    if(event_type == 'released')  await VideoOutputReset('cbWidgetAction', event_value, true);
    break;

  case widgetIds.noise_removal:
    if(event_type == 'changed')  await toggleNoiseRemoval(event_value);
    break;
  }
}

async function cbDoNotDisturb(event) {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('cbDoNotDisturb', `state_combined_room=${state_combined_room}`, event);

  if(state_combined_room && event == 'Inactive')  await xcommand('Conference DoNotDisturb Activate', {Timeout: setting.control.timeout_dnd});
}

async function cbMicMute(event) {
  const setting = device_setting[LVCR_ROLE_SELF];
  const state_combined_room = setting.control.state_combined_room;
  handleLog('cbMicMute', `state_combined_room=${state_combined_room}`, event);

  if(event.Mute)  setting.control.state_mute = event.Mute.toLowerCase();
}

async function listenOn() {
  handleLog('listenOn', `lvcr_design=${LVCR_DESIGN_SELF}, lvcr_role=${LVCR_ROLE_SELF}`);
  await xapi.event.on('Audio MicrophonesMuteStatus', (event) => cbMicMute(event));
  await xapi.event.on('CallDisconnect', (event) => setTimeout(common_cbCallDisconnected, 1000, event));
  await xapi.event.on('UserInterface Extensions Panel Clicked', (event) => cbWidgetAction(event, 'panel_clicked'));
  await xapi.event.on('UserInterface Extensions Widget Action', (event) => cbWidgetAction(event));
  await xapi.status.on('Call Status', (event) => cbCallConnected(event));
  await xapi.status.on('Conference DoNotDisturb', (event) => cbDoNotDisturb(event));
  await xapi.status.on(`GPIO Pin 1`, (event) => common_cbSensorState(event));
  if(LVCR_ROLE_SELF == LVCR_ROLE_1)   await xapi.status.on(`GPIO Pin 2`, (event) => common_cbSensorState(event));

  const setting = device_setting[LVCR_ROLE_SELF];

  if(is_commonS() && !TEST_BTN_COMBINE_ROOM) {
    await xapi.event.on('UserInterface Message Prompt Cleared', (event) => common_disableUI(event));
  }

  if(SHOW_PAGE_AUDIO) {
    await xapi.status.on('Audio Volume', (event) => updateUI({'audio': {'volume': event}}));
    await xapi.status.on('Audio VolumeMute', (event) => updateUI({'audio': {'volume_mute': event}}));

    await xapi.config.on('Audio Input Microphone', (event) => updateUI({'audio': {'mic': event}}));
    await xapi.config.on('Audio Output Line 1', (event) => updateUI({'audio': {'volume': event}}));
  }

  if(B_COMMON_STANDBY) {
    if(LVCR_ROLE_SELF == LVCR_ROLE_1) {
      await setGpioMode(GPIO_STANDBY.id, 'OutputManualState');
      await xapi.status.on(`Standby`, (event) => lvcr1_cbStandby(event));
      await lvcr1_cbStandby();
    }
    else {
      await setGpioMode(GPIO_STANDBY.id, 'InputNoAction');
      await xapi.status.on(`GPIO Pin ${GPIO_STANDBY.id}`, (event) => common_cbStandby(event));
      await common_cbStandby();
    }
  }
}

let timer_reset_retry = 0;
async function resetSetting(cb_from='') {
  const b_idle = await isIdle();
  handleLog('resetSetting', `cb_from=${cb_from}, b_idle=${b_idle}, timer_reset_retry=${timer_reset_retry}`);

  if(!b_idle) {
    clearTimeout(timer_reset_retry);
    timer_reset_retry = setTimeout(resetSetting, TIMER_RETRY_RESET, C.RESET_SETTING_RETRY);
  }
  else
    await restoreConfig(cb_from);
}

async function restoreConfig(cb_from='') {
  if(cb_from == C.INIT_CONFIG)  device_setting = JSON.parse(JSON.stringify(DEVICE_SETTING_C));

  const setting = device_setting[LVCR_ROLE_SELF];
  setting.control.state_mute = await xapi.status.get('Audio Microphones Mute').catch(e => {return C.OFF});
  setting.control.state_mute = setting.control.state_mute.toLowerCase();
  handleLog(`restoreConfig`, `cb_from=${cb_from}, lvcr_design=${LVCR_DESIGN_SELF}, lvcr_role=${LVCR_ROLE_SELF}, mute=${setting.control.state_mute}`);

  if(LVCR_ROLE_SELF == LVCR_ROLE_1)  await lvcr1_initConfig();
  else  await lvcrX_initConfig();

  if(cb_from == C.INIT_CONFIG)  await listenOn(); //setTimeout(listenOn, TIMER_DELAY_TASK)
}

async function initConfig(cb_from='') {
  const su = await xapi.status.get('SystemUnit').catch(e => {return ''});
  const ci_name = await xapi.status.get('UserInterface ContactInfo Name').catch(e => {return ''});
  handleLog('initConfig', `version=${MACRO_VERSION}, cb_from=${cb_from}, lvcr_design=${LVCR_DESIGN_SELF}, lvcr_role=${LVCR_ROLE_SELF}, ci_name=${ci_name}`);

  await xconfig('Macros AutoStart', 'On');
  await xconfig('Macros Mode', 'On');
  await xconfig('Macros UnresponsiveTimeout', '5');
  await xconfig('HttpClient Mode', 'On');
  await xconfig('HttpClient AllowHTTP', 'False');
  await xconfig('HttpClient AllowInsecureHTTPS', 'True');

  if(su && hasSensor(su.Software.Name)) {
    device_setting[LVCR_ROLE_SELF].control.has_sensor = true;

    await xconfig('WebEngine Mode', 'On');
    await xconfig('WebEngine Features WebGL', 'On');
    await xconfig('RoomAnalytics AmbientNoiseEstimation Mode', 'On');
    await xconfig('RoomAnalytics PeopleCountOutOfCall', 'On');
    await xconfig('RoomAnalytics PeoplePresenceDetector', 'On');
    await xconfig('Standby WakeupOnMotionDetection', 'On');
  }

  await xconfig('UserInterface Help Tips', 'Hidden');
  await xconfig('UserInterface Features HideAll', 'False');

  if(ci_name)           await xconfig(`SystemUnit Name`, ci_name);
  if(MSG_SIGNIN_BANNER) await xapi.Command.SystemUnit.SignInBanner.Set({}, MSG_SIGNIN_BANNER);

  await restoreConfig(C.INIT_CONFIG);
}

/**********************************************************************************/
/* XML
*/
const ROW_COMBINE_ROOM = `
<Row>
  <Name/>
  <Widget>
    <WidgetId>text-combine_room</WidgetId>
    <Name>Combine room</Name>
    <Type>Text</Type>
    <Options>size=3;fontSize=normal;align=left</Options>
  </Widget>
  <Widget>
    <WidgetId>button-combine_room</WidgetId>
    <Type>GroupButton</Type>
    <Options>size=4</Options>
    <ValueSpace>
      <Value>
        <Key>${STATE_COMBINED_ROOM_1}</Key>
        <Name>Standalone</Name>
      </Value>
      <Value>
        <Key>${STATE_COMBINED_ROOM_1_2}</Key>
        <Name>1+2</Name>
      </Value>
      <Value>
        <Key>${STATE_COMBINED_ROOM_1_3}</Key>
        <Name>1+3</Name>
      </Value>
      <Value>
        <Key>${STATE_COMBINED_ROOM_1_2_3}</Key>
        <Name>1+2+3</Name>
      </Value>
    </ValueSpace>
  </Widget>
</Row>
`

const ROW_STATUS_COMBINE = `
<Row>
  <Name/>
  <Widget>
    <WidgetId>text-status_combine_1</WidgetId>
    <Name>Room Combine Status</Name>
    <Type>Text</Type>
    <Options>size=2;fontSize=normal;align=left</Options>
  </Widget>
  <Widget>
    <WidgetId>text-status_combine</WidgetId>
    <Name></Name>
    <Type>Text</Type>
    <Options>size=2;fontSize=normal;align=left</Options>
  </Widget>
</Row>
`

const PAGE_CONTROL = `
<Page>
  <Name>Room Control</Name>
  <PageId>page-control</PageId>
  <Options>hideRowNames=1</Options>
  %ROW_STATUS_COMBINE%
  %ROW_RESET_TO_DEFAULT%
</Page>
`

const ROW_MIC_WIRELESS = `
<Row>
  <Name>%NAME%</Name>
  <Widget>
    <WidgetId>%WIDGET_TOGGLE%</WidgetId>
    <Type>ToggleButton</Type>
  </Widget>
  <Widget>
    <WidgetId>%WIDGET_SPINNER%</WidgetId>
    <Type>Spinner</Type>
    <Options>size=2;style=plusminus</Options>
  </Widget>
  <Widget>
  <WidgetId>spacer-1</WidgetId>
  <Type>Spacer</Type>
  <Options>size=1</Options>
</Widget>
</Row>
`

const ROW_REMARK_MIC = `
<Row>
  <Name/>
  <Widget>
    <WidgetId>text-remark_wireless_mic</WidgetId>
    <Name>Remark: Mic will be reverted to default when a call ends.&#10;Default: Ceiling Mic=On, Wireless Mic (if any)=Off</Name>
    <Type>Text</Type>
    <Options>size=4;fontSize=small;align=left</Options>
  </Widget>
</Row>
`
const ROW_REMARK_MIC_EXCLUSIVE = `
<Row>
  <Name/>
  <Widget>
    <WidgetId>text-remark_wireless_mic</WidgetId>
    <Name>Remark: Enabling Wireless Mic will disable Ceiling Mic or vice versa.</Name>
    <Type>Text</Type>
    <Options>size=4;fontSize=small;align=left</Options>
  </Widget>
</Row>
`

const ROW_CEILING_SPEAKER = `
<Row>
  <Name>Ceiling Speaker Volume</Name>
  <Widget>
    <WidgetId>toggle-speaker_ceiling_mode</WidgetId>
    <Type>ToggleButton</Type>
  </Widget>
  <Widget>
    <WidgetId>spinner-speaker_ceiling_level</WidgetId>
    <Type>Spinner</Type>
    <Options>size=2;style=plusminus</Options>
  </Widget>
  <Widget>
    <WidgetId>spacer-1</WidgetId>
    <Type>Spacer</Type>
    <Options>size=1</Options>
  </Widget>
</Row>
`

const ROW_NOISE_REMOVAL = `
<Row>
  <Name>Noise Removal</Name>
  <Widget>
    <WidgetId>toggle-noise_removal</WidgetId>
    <Type>ToggleButton</Type>
  </Widget>
  <Widget>
    <WidgetId>spacer-1</WidgetId>
    <Type>Spacer</Type>
    <Options>size=3</Options>
  </Widget>
</Row>
`
const PAGE_AUDIO = `
<Page>
  <Name>Audio</Name>
  <PageId>page-audio</PageId>
  %ROW_NOISE_REMOVAL%
  <Row>
    <Name>Ceiling Mic</Name>
    <Widget>
      <WidgetId>toggle-mic_1_mode</WidgetId>
      <Type>ToggleButton</Type>
    </Widget>
    <Widget>
      <WidgetId>spacer-1</WidgetId>
      <Type>Spacer</Type>
      <Options>size=3</Options>
    </Widget>
  </Row>
  %ROW_MIC_WIRELESS%
  %ROW_CEILING_SPEAKER%
  %ROW_REMARK_MIC_EXCLUSIVE%
  %ROW_REMARK_MIC%
</Page>
`

const ROW_CAMERA_VIEW_1_2 = `
<Row>
  <Name>Side-by-side View</Name>
  <Widget>
    <WidgetId>button-camera_view</WidgetId>
    <Type>GroupButton</Type>
    <Options>size=4;columns=4</Options>
    <ValueSpace>
      <Value>
        <Key>always</Key>
        <Name>Always</Name>
      </Value>
      <Value>
        <Key>auto</Key>
        <Name>Auto</Name>
      </Value>
      <Value>
        <Key>1</Key>
        <Name>Room 1</Name>
      </Value>
      <Value>
        <Key>2</Key>
        <Name>Room 2</Name>
      </Value>
    </ValueSpace>
  </Widget>
</Row>
`

const ROW_CAMERA_VIEW_1_3 = `
<Row>
  <Name>Side-by-side View</Name>
  <Widget>
    <WidgetId>button-camera_view</WidgetId>
    <Type>GroupButton</Type>
    <Options>size=4;columns=4</Options>
    <ValueSpace>
      <Value>
        <Key>always</Key>
        <Name>Always</Name>
      </Value>
      <Value>
        <Key>auto</Key>
        <Name>Auto</Name>
      </Value>
      <Value>
        <Key>1</Key>
        <Name>Room 1</Name>
      </Value>
      <Value>
        <Key>2</Key>
        <Name>Room 3</Name>
      </Value>
    </ValueSpace>
  </Widget>
</Row>
`

const ROW_CAMERA_VIEW_1_2_3 = `
<Row>
  <Name>Side-by-side View</Name>
  <Widget>
    <WidgetId>button-camera_view</WidgetId>
    <Type>GroupButton</Type>
    <Options>size=4;columns=3</Options>
    <ValueSpace>
      <Value>
        <Key>1</Key>
        <Name>Room 1</Name>
      </Value>
      <Value>
        <Key>2</Key>
        <Name>Room 2</Name>
      </Value>
      <Value>
        <Key>3</Key>
        <Name>Room 3</Name>
      </Value>
      <Value>
        <Key>always</Key>
        <Name>Always</Name>
      </Value>
      <Value>
        <Key>auto</Key>
        <Name>Auto</Name>
      </Value>
    </ValueSpace>
  </Widget>
</Row>
`

const ROW_CAMERA_PRESET = `
<Value>
  <Key>%KEY%</Key>
  <Name>%NAME%</Name>
</Value>
`

const PAGE_CAMERA = `
<Page>
  <Name>Camera</Name>
  <Row>
    <Name>Selfview</Name>
    <Widget>
      <WidgetId>toggle-camera_selfview</WidgetId>
      <Type>ToggleButton</Type>
    </Widget>
    <Widget>
      <WidgetId>spacer-1</WidgetId>
      <Type>Spacer</Type>
      <Options>size=3</Options>
    </Widget>
  </Row>
  %ROW_CAMERA_VIEW%
  <Row>
    <Name>Camera Position</Name>
    <Widget>
      <WidgetId>group-camera_preset</WidgetId>
      <Type>GroupButton</Type>
      <Options>size=4;columns=2</Options>
      <ValueSpace>
        <Value>
          <Key>camera_front</Key>
          <Name>Front</Name>
        </Value>
        <Value>
          <Key>camera_rear</Key>
          <Name>PresenterTrack</Name>
        </Value>
        %ROW_CAMERA_PRESET%
      </ValueSpace>
    </Widget>
  </Row>
  <Row>
    <Name/>
    <Widget>
      <WidgetId>text-last_camera_preset</WidgetId>
      <Name></Name>
      <Type>Text</Type>
      <Options>size=4;fontSize=small;align=left</Options>
    </Widget>
  </Row>
  <PageId>page-camera</PageId>
  <Options/>
</Page>
`

const PAGE_DISPLAY = `
<Page>
  <Name>Display</Name>
  <Row>
    <Name>Row</Name>
    <Widget>
      <WidgetId>group-monitor_preset</WidgetId>
      <Type>GroupButton</Type>
      <Options>size=4;columns=1</Options>
      <ValueSpace>
        <Value>
          <Key>1</Key>
          <Name>Video on Left || Presentation on Right</Name>
        </Value>
        <Value>
          <Key>2</Key>
          <Name>Presentation on Left || Video on Right</Name>
        </Value>
        <Value>
          <Key>3</Key>
          <Name>Presentation Only on all Display</Name>
        </Value>
        <Value>
          <Key>4</Key>
          <Name>Video &amp; Presentation on the same Display</Name>
        </Value>
      </ValueSpace>
    </Widget>
  </Row>
  <Row>
    <Name>Row</Name>
    <Widget>
      <WidgetId>text-remark_display</WidgetId>
      <Name>Remark: Display Role will be reverted to default when a call ends.</Name>
      <Type>Text</Type>
      <Options>size=4;fontSize=small;align=left</Options>
    </Widget>
  </Row>
  <PageId>page-monitor_role_preset</PageId>
  <Options>hideRowNames=1</Options>
</Page>
`

const PAGE_TEST = `
<Page>
  <Name>Test</Name>
  <PageId>page-test</PageId>
  <Options>hideRowNames=1</Options>
  %ROW_COMBINE_ROOM%
</Page>
`

const PANEL_ROOM_CONTROL = `
<Extensions>
  <Panel>
    <Order>1</Order>
    <PanelId>${PANEL_ID}</PanelId>
    <Location>HomeScreenAndCallControls</Location>
    <Type>Statusbar</Type>
    <Icon>${PANEL_BTN_ICON}</Icon>
    <Name>${PANEL_BTN_NAME}</Name>
    <ActivityType>Custom</ActivityType>
    %PAGE_TEST%
    %PAGE_CONTROL%
    %PAGE_AUDIO%
    %PAGE_CAMERA%
    %PAGE_DISPLAY%
  </Panel>
</Extensions>
`

/**********************************************************************************/
/* Auxiliary functions
*/
const TIMER_INIT_CONFIG   = 2 * 1000; // in msec
const TIMER_UPDATE_UI     = 50;
const TIMER_DELAY_TASK    = 3 * 1000; // in msec

const C = {
  'INIT_CONFIG':    'init_config',
  'ON':             'on',
  'OFF':            'off',
  'AUDIO':          'audio',
  'VIDEO':          'video',
  'CAMERA':         'camera',
  'CAMERA_FRONT':   'camera_front',
  'CAMERA_REAR':    'camera_rear',
  'COMBINE':        'combine',
  'COMBINED_C':     'Combined',
  'CONTROL':        'control',
  'STANDALONE':     'standalone',
  'STANDALONE_C':   'Standalone',
  'STANDBY_ENTERING': 'EnteringStandby',
  'STANDBY_HALFWAKE': 'Halfwake',
  'STANDBY_OFF':      'Off',
  'STANDBY_STANDBY':  'Standby',
  'ACTIVATE':       'activate',
  'DEACTIVATE':     'deactivate',
  'LOCAL_INSTANCE': 'local_instance',
  'RESET_SETTING':  'reset_setting',
  'RESET_SETTING_RETRY': 'reset_setting_retry',
  'AUTO':           'auto',
  'ALWAYS':         'always',
  'DISABLE':        'disable',
}

async function displayAlertMessage(value) {
  await xcommand(`UserInterface Message Alert Display`, value);
}

async function micDbCrementor(type, value, reference) {
  let new_value = parseInt(value);
  if(type == 'increment') {
    if(new_value < reference) ++new_value;
  }
  else {
    if(new_value > 0) --new_value;
  }
  handleDebug('micDbCrementor', `type=${type}, reference=${reference}, value=${value}, new_value=${new_value}`);
  return new_value;
}

async function setAudioInputMic(mic, mode='', level='') {
  handleLog(`setAudioInputMic: mic ${mic}, mode=${mode}, level=${level}`);
  if(!!mode)  await xconfig(`Audio Input Microphone ${mic} Mode`, mode);
  if(!!level) await xconfig(`Audio Input Microphone ${mic} Level`, level);
}

async function setCameraPreset(preset_id, connector_id) {
  handleLog('setCameraPreset', `preset_id=${preset_id}, connector_id=${connector_id}`);
  if(preset_id)     await xcommand('Camera Preset Activate', {PresetId: preset_id});
  if(connector_id)  await xcommand('Video Input SetMainVideoSource', {ConnectorId: connector_id});
}

// The default state for a pin in output mode is High (+12 V).
async function setGpioState(pin, state) {
  handleLog('setGpioState', `pin=${pin}, state=${state}`);
  if(1 == pin)      await xcommand('GPIO ManualState Set', {Pin1: state});
  else if(2 == pin) await xcommand('GPIO ManualState Set', {Pin2: state});
  else if(3 == pin) await xcommand('GPIO ManualState Set', {Pin3: state});
  else if(4 == pin) await xcommand('GPIO ManualState Set', {Pin4: state});
}

async function setGpioMode(pin, mode) {
  handleLog('setGpioMode', `pin=${pin}, mode=${mode}`);
  await xconfig(`GPIO Pin ${pin} Mode`, mode);
}

async function setVideoOutputConnectorMonitorRole(id, role) {
  handleLog('setVideoOutputConnectorMonitorRole', `id=${id}, role=${role}`);
  await xconfig(`Video Output Connector ${id} MonitorRole`, role);
}

async function setWidgetValue(widget_id, value) {
  handleLog('setWidgetValue', `widget_id=${widget_id}, value=${value}`);
  const widget_type = widget_id.split('-')[0];
  if(widget_type == 'toggle')  value = value.toLowerCase();
  await xcommand('UserInterface Extensions Widget SetValue', {WidgetId: widget_id, Value: value});
}

async function unsetWidgetValue(widget_id) {
  handleLog('unsetWidgetValue', `widget_id=${widget_id}`);
  const widget_type = widget_id.split('-')[0];
  await xcommand('UserInterface Extensions Widget UnsetValue', {WidgetId: widget_id});
}

async function restoreExtension(xml, remove_panel=[]) {
  handleLog('restoreExtension', `PanelId=${PANEL_ID}, remove_panel=`, remove_panel);
  for(const val of remove_panel)
    await xcommand(`UserInterface Extensions Panel Remove`, {PanelId: val});

  await xapi.Command.UserInterface.Extensions.Panel.Save({PanelId: PANEL_ID}, xml)
  .catch(e => handleError('restoreExtension', `PanelId=${PANEL_ID}`, e));
}

async function removeExtensionPanel(ui_extension, panel) {
  handleLog('removeExtensionPanel', `panel=${panel}`);
  for(const val of ui_extension) {
      handleDebug('removeExtensionPanel', `ui_extension Panel`, val);
      if(val.PanelId == PANEL_ID) {
        await xcommand('UserInterface Extensions Panel Remove', {PanelId: PANEL_ID});
      }
  }
}

async function isIdle() {
  const su_state = await xapi.status.get('SystemUnit State').catch(e => {return ''});
  const local_preso = await xapi.status.get('Conference Presentation LocalInstance SendingMode').catch(e => {return ''});
  const wb_session = await xapi.status.get(`Whiteboard Session`).catch(e => {return []});
  let cnt_call = 0;

  handleDebug('isIdle', `su_state=`, su_state);
  if(su_state)  cnt_call = parseInt(su_state.NumberOfActiveCalls) + parseInt(su_state.NumberOfInProgressCalls) + parseInt(su_state.NumberOfSuspendedCalls);

  const b_idle = (cnt_call || local_preso.length || wb_session.length)? false : true;
  handleLog('isIdle', `b_idle=${b_idle}, cnt_call=${cnt_call}, local_preso=${local_preso}, wb_session=`, wb_session);
  return b_idle;
}

/**/
async function getTimeNow(sec=1) {
  let ts = (new Date()).getTime();
  if(sec) ts = Math.round(ts/1000);
  return ts;
}

async function getLocalSystemTime() {
  return await xapi.Status.Time.SystemTime.get();  // Hope for NTP is sync'd after delayed sceonds
}

async function getSecondToNext(f_hour, f_minute=0, sys_time='') {
  if(!sys_time)   sys_time = await getLocalSystemTime();
  f_hour = parseInt(f_hour);
  f_minute = parseInt(f_minute);

  const t_hour = await getHour(sys_time);
  const t_min = await getMinute(sys_time);
  const time_now = new Date();
  const time_next = new Date();
  if(t_hour >= f_hour && t_min >= f_minute) f_hour += 24;
  time_next.setHours(f_hour, f_minute, 0, 0);

  const diff_sec = Math.round((time_next.getTime() - time_now.getTime())/1000);
  handleDebug('getSecondToNext', `sys_time=${sys_time}, t_hour=${t_hour}, t_min=${t_min}, f_hour=${f_hour}, f_minute=${f_minute}, time_now=${time_now}, time_next=${time_next}, diff_sec=${diff_sec}`);
  return diff_sec;
}

async function getHour(sys_time) {
  return parseInt(sys_time.split('T')[1].split(':')[0]);
}

async function getMinute(sys_time) {
  return parseInt(sys_time.split('T')[1].split(':')[1]);
}

/**/
function handleDebug(func, ...args) {
  console.debug(`${func}:`, JSON.stringify(args));
}

function handleError(func, ...args) {
  console.error(`${func}:`, JSON.stringify(args));
}

function handleLog(func, ...args) {
  console.log(`${func}:`, JSON.stringify(args));
}

function hasSensor(softwareName) {
  handleLog('hasSensor', `softwareName=${softwareName}`);
  switch(softwareName) {
  case 's53200': // sunrise (Webex Room Series + WebexBoard)
  case 's53300': // zenith (Room Kit Pro / Room 70 G2 / Panorama / Desk Pro)
    return true;
  default:
    return false;
  }
}

async function xcommand(path, value='') {
  handleDebug('xcommand', `path=${path}`, value);
  return await xapi.command(path, value)
    .catch(e => handleError('xcommand', `path=${path}, value=${JSON.stringify(value)}`, e));
}

async function xconfig(path, value) {
  handleDebug('xconfig', `path=${path}`, value);
  return await xapi.config.set(path, value)
    .catch(e => handleError('xconfig', `path=${path}, value=${JSON.stringify(value)}`, e));
}

/**********************************************************************************/
/* Start here
*/
setTimeout(initConfig, TIMER_INIT_CONFIG, C.INIT_CONFIG);
