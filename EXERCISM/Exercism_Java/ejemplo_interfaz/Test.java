import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


public class Test {
    public Test() {

    }

    public static List<Car> mejoresAutos(List<Car> cars) {
        Collections.sort(cars);
        return cars;
    }

    public static void main(String []args) {
        Car car1 = new Car(3);
        Car car2 = new Car(2);
        Car car3 = new Car(5);
        List<Car> unsortedCars = new ArrayList<>();
        unsortedCars.add(car1);
        unsortedCars.add(car2);
        unsortedCars.add(car3);
        mejoresAutos(unsortedCars);
        for (Car c : unsortedCars) {
            System.out.println(c.toString());
            
        }
    }
    
}
