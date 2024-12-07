import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class Ejercicios2 {

    public static LocalDateTime fecha(String cita) {
        String[] fechas = cita.split("[ /:]");
        int[] nums = new int[fechas.length];
        for (int i=0, n=fechas.length; i < n; i++) {
            nums[i] = Integer.valueOf(fechas[i]);
        }
        LocalDateTime datetime = LocalDateTime.of(nums[2], nums[0], nums[1], nums[3], nums[4], nums[5]);
        LocalDateTime dateNow = LocalDateTime.now();
        System.out.println(dateNow.getHour());
        return datetime;
    }

    public static String describirFecha(LocalDateTime cita) {
        DateTimeFormatter printer = DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy, 'at' h a'.'");
        String description = "You have an appointment on " + printer.format(cita);
        return description;
    }

    public static void trabajarConBits() {
        int inicial = 0b0100;
        inicial = inicial >> 2;
        System.out.println(Integer.toBinaryString(inicial));
    }
    
    public static void main(String[] args) {
        System.out.print(String.format("Hola %s", "como"));
        int num1 = 0;
        num1 ++;
        int[] array1 = {1, 2, 3};
        array1[1]++;
        // System.out.println(Arrays.toString(array1));
        // System.out.println(fecha("7/25/2019 13:45:00"));
        // System.out.println(describirFecha(LocalDateTime.of(2019, 10, 4, 15, 0, 0)));

        // Trabajar con BITS
        // trabajarConBits();

        
    }
}
