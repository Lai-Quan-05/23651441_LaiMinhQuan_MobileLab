import { View, Text } from 'react-native';
import { StyleSheet} from 'react-native';
type myType = {
  name: string;
  age: number;
  isAdmin: boolean;
};


const UserCard = ({ name, age, isAdmin }: myType) => {
  return (
    <View>
      {isAdmin && <Text>[ QUẢN TRỊ VIÊN ]</Text>}
      <Text style={styles.text}>Tên: {name}</Text>
      <Text style={styles.text}>Tuổi: {age}</Text>
      <Text style={styles.text}>
        Vai trò: {isAdmin ? 'Admin' : 'Thành viên'}
      </Text>
      
    </View>
  );
};
const MainApp = () => {
  return (
    <View >
      <UserCard name="Lại Minh Quân" age={20} isAdmin={true} />
      
      <UserCard name="Codix" age={21} isAdmin={false} />
    </View>
  );
};
 const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
  
  },
});
export default MainApp;
