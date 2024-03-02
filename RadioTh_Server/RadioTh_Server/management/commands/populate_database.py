"""
Command created to populate tables Players_Attribute_Backend project database .
"""

from django.core.management.base import BaseCommand
from RadioTh_Server.models import Treatment
import csv
from datetime import datetime


def clear_table(table):
    """Remove all items in a table"""
    table.objects.all().delete()


class Command(BaseCommand):
    help = 'Populate the database with sample data'

    def create_plan(self, plan: list) -> None:
        """Create a plan object in Treatment table with a list"""
        plan_to_add = {"MRN": plan[0], "PlanName": plan[1], "ASC": plan[2], "Technique": plan[3], "Energy": plan[4],
                       "Dose": plan[5], "ClearCheck": plan[7],
                       "Complexity": plan[8], "MU": plan[9], "PD_Gamma": plan[10], "BeamOnTime": plan[11],
                       "TxSite": plan[12], "QAShot": plan[13], "Note": plan[14], "OblFactor": plan[15]}

        fields = plan[6].split("-")
        plan_to_add["FieldStart"] = fields[0]
        plan_to_add["FieldStop"] = fields[1]
        # create plan
        new_player = Treatment(**plan_to_add)
        new_player.save()
        message = "Plan added to database: " + plan[0]
        self.stdout.write(self.style.SUCCESS(message))


    def handle(self, *args, **options):
        """Populate database with data/dummy_data.csv """
        clear_table(Treatment)
        # Code to populate Treatment table
        data = []
        with open('RadioTh_Server/data/dummy_data.csv', newline='') as csvfile:
            plan_reader = csv.reader(csvfile)
            counter = 0
            for row in plan_reader:
                if counter > 0:
                    data.append(row)
                counter += 1

        # for each plan in data:
        for row in data:
            self.create_plan(row)
        self.stdout.write(self.style.SUCCESS('Treatment table populated successfully'))

