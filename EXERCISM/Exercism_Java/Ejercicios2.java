import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    public static void trabajarConExceptiones(String operator) {
        try {
            if (operator != "+" || operator != "*" || operator != "/") {
                String message = "";
                if (operator == null) {
                    message = "Operation cannot be null";
                } else if (operator == " ") {
                    message = "Operation cannot be empty";
                } else {
                    message = "Operation '"+operator+"' does not  exist";
                }
                // OJO: las exepctions aceptan 2 parametros:
                /*
                 * Parametro 1:String -> Mensaje
                 * Parametro 2:Throwable/null -> la causa de la excepcion, que puede ser otra exepction
                 */
                throw new IllegalArgumentException(message);
            }
            
            
        } catch (IllegalArgumentException ilegal) {
            System.out.println(ilegal.getMessage());
        }
        
    }

    public static void trabajandoConSets() {
        String[] strings = {"Hola", "Mundo", "Mundo", "vamos"};
        Set<String> newSet = new HashSet<>(Arrays.asList(strings));
        Set<String> set2 = new HashSet<>(Arrays.asList("Mundo", "Hola", "como", "vamos"));
        Set<String> common = new HashSet<>(newSet);
        newSet.retainAll(set2);
        System.out.println(newSet);
        // System.out.println(set2);
        List<String> list1 = new ArrayList<>(newSet);
        List<String> list2 = new ArrayList<>(set2);
        // System.out.println(list1.equals(list2));
        boolean valido = false;
        
    //    System.out.println(newSet.equals(set2));
        // newSet.stream().forEach(System.out::println);
        
    }

    // Los items son constantes
    public enum Months {
        JANUARY, FEBRUARY, MARCH
    }

    // Pueden tener metodos y atributos
    public enum Rating {
        LEGENDARY(10),
        EPIC(10),
        PERFECT(9),
        VERYGOOD(8),
        GOOD(7),
        NORMAL(5),
        BAD(4);

        private int numOfStars;
        Rating(int numOfStars) {
            this.numOfStars = numOfStars;
        }

        private int getNumberOfStars() {
            return this.numOfStars;
        }
    }

    public enum LogLevel {
        // TODO: define members for each log level
        TRACE("TRC", 1),
        DEBUG("DBG", 2),
        INFO("INF", 4),
        WARNING("WRN", 5),
        ERROR("ERR", 6),
        FATAL("FTL", 42),
        UNKNOW("ANY", 0);


        private String message;
        private int number;

        LogLevel(String message, int number) {
            this.message = message;
            this.number = number;
        }

        private String getMessage() {
            return this.message;
        }
        private int getNumber() {
            return this.number;
        }

        public static LogLevel fromSymbol(String symbol) {
            for (LogLevel level : LogLevel.values()) {
                if(level.getMessage().equalsIgnoreCase(symbol)) {
                    return level;   
                }
            }
            return LogLevel.UNKNOW;
        }
    }
    

    public static void trabajandoConEnum() {
        System.out.println(Months.JANUARY);
        
        System.out.println(Rating.EPIC.getNumberOfStars());
        String message = "[ IdNF   ] File Deleted";
        String symbol = message.substring(message.indexOf("[") + 1, message.indexOf("]")).trim();
        System.out.println(LogLevel.fromSymbol(symbol).getNumber());
        // * Convert [ code ] -> number
        message = message.replaceFirst("\\[[\\w ]+\\]", "como");
        System.out.println(message);

        
    }

    
    public static void main(String[] args) {
        // * Trabajar con Enum Type
        trabajandoConEnum();

        // * Trabajar con SETs 
        // trabajandoConSets();

        // ? Trabajar con excepciones
        // trabajarConExceptiones();
    



        // System.out.print(String.format("Hola %s", "como"));
        int num1 = 0;
        num1 ++;
        int[] array1 = {1, 2, 3};
        array1[1]++;
        // System.out.println(Arrays.toString(array1));
        // System.out.println(fecha("7/25/2019 13:45:00"));
        // System.out.println(describirFecha(LocalDateTime.of(2019, 10, 4, 15, 0, 0)));

        // Trabajar con BITS
        // trabajarConBits();

        // Trabajando con Listas<tipo>
        List<String> someStrings = new ArrayList<>();
        someStrings.add("hola");
        someStrings.add("mundo");
        // System.out.println(someStrings);
        List<String> someStrings2 = Arrays.asList("value1", "item2");
        // System.out.println(someStrings2.get(0));
        // System.out.println(Integer.MIN_VALUE);
        // System.out.println(Arrays.asList(1, 3, 4).contains(1));

        // throw new IllegalArgumentException();
        int flags = 0b1010;
        int mask = 0b0010;
        // System.out.println(4 >> 1);
       


    }

   
   
}


