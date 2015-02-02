using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LearnCS.test
{
    class DataTypeTest
    {
        public DataTypeTest()
        {
            testBool();
        }

        private void testBool()
        {
            bool boolValue = true;
            Console.WriteLine("## Test Boolean ##");
            Console.WriteLine("bool: " + boolValue);
            Console.WriteLine("bool hash code: " + boolValue.GetHashCode());
            Console.WriteLine("bool type: " + boolValue.GetType());
            Console.WriteLine("bool type code: " + boolValue.GetTypeCode());
            Console.WriteLine("bool string: " + boolValue.ToString());
        }

        private void testByte()
        {

        }
    }
}
