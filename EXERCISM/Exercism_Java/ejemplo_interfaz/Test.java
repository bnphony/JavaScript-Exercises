import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test {
    public Test() {

    }

    public static List<Car> mejoresAutos(List<Car> cars) {
        Collections.sort(cars);
        return cars;
    }
    
    public static void main(String[] args) {
        Car c1 = new Car(7);
        Car c2 = new Car(2);
        Car c3 = new Car(5);
        List<Car> unsortedCars = new ArrayList<>();
        unsortedCars.add(c1);
        unsortedCars.add(c2);
        unsortedCars.add(c3);
        System.out.println(mejoresAutos(unsortedCars));
    }
}