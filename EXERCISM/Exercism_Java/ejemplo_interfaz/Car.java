public class Car implements Comparable<Car>{
    private int victories = 0;
    public Car(int victories) {
        this.victories = victories;
    }

    @Override
    public int compareTo(Car otherCar) {
        return Integer.compare(otherCar.victories, this.victories);
    }

    @Override
    public String toString() {
        return "Car: Victories " + this.victories;
    }
}