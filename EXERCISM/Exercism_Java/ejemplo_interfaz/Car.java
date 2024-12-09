public class Car implements Comparable<Car>{
    private int victories = 0;
    public Car(int numOfVictories) {
        this.victories = numOfVictories;
    }

    @Override
    public int compareTo(Car otherCar) {
        // return Integer.compare(otherCar.victories, this.victories);
        return Integer.compare(this.victories, otherCar.victories);
    }

    @Override
    public String toString() {
        return "Victorias : " + this.victories;
    }
}