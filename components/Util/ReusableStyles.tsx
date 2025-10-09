import { StyleSheet } from 'react-native';

// This is really scuffed apologies for whoever deals with this after

export const componentStyles = StyleSheet.create({
  menuButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    margin: 2,
    padding: 20,
    borderRadius: 10,
    boxShadow: `0px 5px 8px -4px #000000`
  },
  buttonSm: {
    flex: 1,
    flexGrow: 0,
    alignContent: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttonXL: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    margin: 2,
    padding: 20,
    borderRadius: 10,
    boxShadow: '0px 5px 8px -4px #000000'
  },
  text: {
    fontSize: 20
  },
  textXL: {
    fontSize: 40
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textSmBold: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  textBoldXL: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  fluidContainer: {
    flex: 1,
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  paddedContainer: {
    padding: 20,
    borderRadius: 10
  },
  smallSqTextEntry: {
    width: 80,
    height: 80,
    padding: 10,
    borderRadius: 5
  }
});
