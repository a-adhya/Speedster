import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  followBox: {
    alignItems: 'center',
  },
  followText: {
    fontSize: 16,
    color: 'gray',
  },
  followCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsSection: {
    flex: 1,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
  },
  signOutText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default styles;
