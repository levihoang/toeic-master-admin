/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css,scss}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Lobster Two', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        Lato: ['Lato', 'sans-serif']
      },
      colors: {
        blue_nav_1: '#8FC0EA',
        blue_2: '#3185cb',
        blue_3: '#2B75B2',
        blue_4_icon: '#529AD6',
        yellow_1: '#FCF5D5',
        yellow_2: '#FEE6B4',
        yellow_3: '#a2825c',
        black_1: 'rgba(0,0,0,0.08)',
        red: '#FF633C',
        A2825C: '#a2825c',
        FCF5D5: '#FCF5D5',
        FEE6B4: '#FEE6B4',
        123748: '#123748',
        FFEDE9: '#FFEDE9',
        CED4DA: '#CED4DA',
        '009CFF': '#009CFF',
        challenging: '#FF7337',
        gray: {
          fb: '#FBFBFB',
          f2: '#F2F2F2',
          e0: '#E0E0E0',
          bd: '#BDBDBD',
          82: '#828282',
          '4f': '#4F4F4F',
          33: '#333333',
          F7F7F7: '#F7F7F7'
        },
        redCustom: {
          d6: '#FFC9D6',
          b1: '#FF98B1',
          a5: '#FF87A5',
          89: '#FF6389',
          72: '#FF3D72',
          '4c': '#F3154C',
          '3b': '#E4033B',
          danger: '#f1416c',
          FF7337: '#FF7337'
        },
        primary: {
          c3: '#FFF3C3',
          90: '#FFE990',
          75: '#FFE475',
          '4d': '#FFDC4D',
          '4a': '#FADA4A',
          21: '#FACF21',
          '00': '#F0C100',
          e2: '#5240E2',
          main: '#8FC0EA',
          edit: '#009ef7'
        }
      },
      boxShadow: {},
      borderRadius: {
        '5px': '5px',
        '20px': '20px'
      },
      spacing: {
        '1px': '1px'
      },
      boxShadow: {
        input:
          '0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)',
        light:
          '0px 0px 1px rgba(40, 41, 61, 0.04), 0px 2px 4px rgba(96, 97, 112, 0.16)',
        'light-0':
          '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
        optionsTag:
          '0px 32px 48px -8px rgba(0, 0, 0, 0.10), 0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 40px 64px -12px rgba(0, 0, 0, 0.08);'
      },
      rounded: {
        28: '28px'
      },
      minWidth: {
        '20px': '20px',
        '64px': '64px',
        '164px': '164px',
        '300px': '300px'
      }
    }
  },
  plugins: []
};
